import { flatten } from "../../utility/array";
import recipes from "../../../data/recipes/index.js";
import { hasCompletedAchievement, allocateResourceItem } from "./progress";

function multiplyComponents(components, factor) {
  return components.map(component => ({
    itemId: component.itemId,
    currencyId: component.currencyId,
    count: factor * component.count,
    substitutionFor: component.substitutionFor
  }));
}

function expandComponentsForItem(item) {
  let recipe = recipes[item.itemId];
  if (!recipe) {
    return [item];
  }

  let result = multiplyComponents(recipe.components, item.count);
  return flatten(result.map(expandComponentsForItem));
}

function processInventoryItem(inventoryItem, availableResources, achievements) {
  let result = allocateResourceItem(
    inventoryItem,
    availableResources.inventory,
    "itemId"
  );

  let recipe = recipes[inventoryItem.itemId];
  if (!recipe) {
    return [result];
  }

  let outstanding = result.required - result.owned;

  let ownedComponentsViaCompletedItems = flatten(
    multiplyComponents(recipe.components, result.owned).map(
      expandComponentsForItem
    )
  ).map(o => ({
    itemId: o.itemId,
    owned: o.count,
    required: o.count,
    substitutionFor: o.substitutionFor
  }));

  let outstandingItems = multiplyComponents(recipe.components, outstanding);
  let outstandingItemProgress = processCollectionItem(
    {
      components: outstandingItems
    },
    availableResources,
    achievements
  );

  let allComponents = [
    ...ownedComponentsViaCompletedItems,
    ...outstandingItemProgress
  ];

  return sumComponents(allComponents);
}

function processCurrencyItem(currencyItem, availableResources, achievements) {
  return [
    allocateResourceItem(currencyItem, availableResources.wallet, "currencyId")
  ];
}

function processCollectionItem(
  collectionItem,
  availableResources,
  achievements
) {
  return flatten(
    collectionItem.components.map(o =>
      processListItem(o, availableResources, achievements)
    )
  );
}

function processListItem(listItem, availableResources, achievements) {
  if (listItem.itemId) {
    return processInventoryItem(listItem, availableResources, achievements);
  }

  if (listItem.currencyId) {
    return processCurrencyItem(listItem, availableResources, achievements);
  }

  if (listItem.components) {
    return processCollectionItem(listItem, availableResources, achievements);
  }

  return [];
}

function sumComponentsByKey(components, key) {
  let totals = {};

  components.forEach(o => {
    let elementId = o[key];
    if (elementId === undefined) {
      return;
    }

    let total = totals[elementId];

    if (!total) {
      total = {
        owned: 0,
        required: 0
      };
      totals[elementId] = total;
    }

    total.owned += o.owned;
    total.required += o.required;
  });

  return Object.keys(totals).map(elementId => ({
    [key]: elementId,
    ...totals[elementId]
  }));
}

function sumComponents(components) {
  return [
    ...sumComponentsByKey(components, "itemId"),
    ...sumComponentsByKey(components, "currencyId")
  ];
}

function processSummaryItem(listItem, availableResources, achievements) {
  let components = flatten(
    processListItem(listItem, availableResources, achievements)
  );

  components = sumComponents(components);

  components.forEach(o => {
    if (o.required) {
      o.progress = o.owned / o.required;
    } else {
      o.progress = 0;
    }
  });

  let result = {
    name: listItem.name,
    itemId: listItem.itemId,
    currencyId: listItem.currencyId,
    components: components
  };

  if (result.components.length) {
    let progress = result.components.reduce((sum, o) => sum + o.progress, 0);
    if (progress) {
      progress /= result.components.length;
    }
    result.progress = progress;
  } else {
    result.progress = 0;
  }

  return result;
}

export { processSummaryItem };
