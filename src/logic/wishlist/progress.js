import { mapKeys } from "../../utility/object";
import recipes from "../../../data/recipes/index.js";

function processResourceItem(resourceItem, resourceCollection, key) {
  let result = {
    [key]: resourceItem[key],
    required: resourceItem.count,
    substitutionFor: resourceItem.substitutionFor,
  };

  let ownedResource = resourceCollection[resourceItem[key]];
  if (ownedResource) {
    let availableCount = ownedResource.owned - ownedResource.allocated;
    let allocatedToResult = Math.min(availableCount, result.required);

    result.owned = allocatedToResult;
    result.progress = result.owned / result.required;

    ownedResource.allocated += allocatedToResult;
  } else {
    result.owned = 0;
    result.progress = 0;
  }

  return result;
}

function processInventoryItem(inventoryItem, availableResources) {
  let result = processResourceItem(
    inventoryItem,
    availableResources.inventory,
    "itemId"
  );

  let outstanding = result.required - result.owned;
  if (outstanding) {
    let recipe = recipes[inventoryItem.itemId];
    if (recipe) {
      let requiredItems = recipe.components.map(component => ({
        itemId: component.itemId,
        count: outstanding * component.count,
        substitutionFor: component.substitutionFor
      }));

      let requiredItemProgress = processCollectionItem(
        {
          components: requiredItems
        },
        availableResources
      );

      result.components = requiredItemProgress.components;
      result.componentProgress = requiredItemProgress.progress;

      result.itemProgress = result.progress;
      result.progress += (1 - result.progress) * result.componentProgress;
    }
  }

  return result;
}

function processCurrencyItem(currencyItem, availableResources) {
  return processResourceItem(
    currencyItem,
    availableResources.wallet,
    "currencyId"
  );
}

function processCollectionItem(collectionItem, availableResources) {
  let result = {
    name: collectionItem.name,
    components: collectionItem.components.map(o =>
      processListItem(o, availableResources)
    )
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

function processListItem(listItem, availableResources) {
  if (listItem.itemId) {
    return processInventoryItem(listItem, availableResources);
  }

  if (listItem.currencyId) {
    return processCurrencyItem(listItem, availableResources);
  }

  if (listItem.components) {
    return processCollectionItem(listItem, availableResources);
  }

  return undefined;
}

function calculateProgress(wishlist, availableResources) {
  return wishlist
    .map(o => processListItem(o, availableResources))
    .filter(o => !!o);
}

function mapCollectionToProgress(collection) {
  return mapKeys(collection, (value, key) => ({
    id: key,
    owned: value.count,
    allocated: 0
  }));
}

export { calculateProgress, mapCollectionToProgress };
