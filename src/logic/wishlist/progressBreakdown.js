import recipes from "../../../data/recipes/index.js";
import { hasCompletedAchievement, processResourceItem } from "./progress";

function calculateRecipeProgress(
  progress,
  outstanding,
  recipe,
  availableResources,
  achievements
) {
  let requiredItems = recipe.components.map(component => ({
    itemId: component.itemId,
    currencyId: component.currencyId,
    count: outstanding * component.count,
    substitutionFor: component.substitutionFor
  }));

  let requiredItemProgress = processCollectionItem(
    {
      components: requiredItems
    },
    availableResources,
    achievements
  );

  return {
    components: requiredItemProgress.components,
    componentProgress: requiredItemProgress.progress,
    itemProgress: progress,
    progress: progress + (1 - progress) * requiredItemProgress.progress
  };
}

function processInventoryItem(inventoryItem, availableResources, achievements) {
  let result = processResourceItem(
    inventoryItem,
    availableResources.inventory,
    "itemId"
  );

  let outstanding = result.required - result.owned;
  if (outstanding) {
    let recipe = recipes[inventoryItem.itemId];
    if (recipe) {
      if (hasCompletedAchievement(recipe, achievements)) {
        result.owned = 1;
        result.progress = 1 / result.required;

        return result;
      }

      result = {
        ...result,
        ...calculateRecipeProgress(
          result.progress,
          outstanding,
          recipe,
          availableResources,
          achievements
        )
      };
    }
  }

  return result;
}

function processCurrencyItem(currencyItem, availableResources, achievements) {
  return processResourceItem(
    currencyItem,
    availableResources.wallet,
    "currencyId"
  );
}

function processCollectionItem(
  collectionItem,
  availableResources,
  achievements
) {
  let result = {
    name: collectionItem.name,
    components: collectionItem.components.map(o =>
      processListItem(o, availableResources, achievements)
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

  return undefined;
}

const processBreakdownItem = processListItem;

export { processBreakdownItem };
