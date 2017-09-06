function getIdsForItem(item) {
  let itemIds = [];
  let currencyIds = [];

  if (item.itemId) {
    itemIds.push(item.itemId);
  }

  if (item.currencyId) {
    currencyIds.push(item.currencyId);
  }

  if (item.items) {
    item.items.forEach(innerItem => {
      let innerIds = getIdsForItem(innerItem);
      itemIds = itemIds.concat(innerIds.itemIds);
      currencyIds = currencyIds.concat(innerIds.currencyIds);
    });
  }

  return {
    itemIds,
    currencyIds
  };
}

function getRequiredData(wishlist) {
  return getIdsForItem({
    items: wishlist
  });
}

export { getRequiredData };
