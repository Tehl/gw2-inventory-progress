import recipes from "../../../data/recipes/index";

function getIdsForItem(item) {
  let itemIds = [];
  let currencyIds = [];

  const processInnerItem = innerItem => {
    let innerIds = getIdsForItem(innerItem);
    itemIds = itemIds.concat(innerIds.itemIds);
    currencyIds = currencyIds.concat(innerIds.currencyIds);
  };

  if (item.itemId) {
    itemIds.push(item.itemId);

    let recipe = recipes[item.itemId];
    if (recipe) {
      recipe.components.forEach(processInnerItem);
    }
  }

  if (item.currencyId) {
    currencyIds.push(item.currencyId);
  }

  if (item.substitutionFor) {
    itemIds.push(item.substitutionFor);
  }

  if (item.components) {
    item.components.forEach(processInnerItem);
  }

  return {
    itemIds,
    currencyIds
  };
}

function getRequiredData(wishlist) {
  return getIdsForItem({
    components: wishlist
  });
}

export { getRequiredData };
