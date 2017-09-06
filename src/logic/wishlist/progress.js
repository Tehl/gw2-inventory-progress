import { mapKeys } from "../../utility/object";

function processResourceItem(resourceItem, resourceCollection, key) {
  let result = {
    [key]: resourceItem[key],
    required: resourceItem.count
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
  return processResourceItem(
    inventoryItem,
    availableResources.inventory,
    "itemId"
  );
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
    items: collectionItem.items.map(o => processListItem(o, availableResources))
  };

  if (result.items.length) {
    let progress = result.items.reduce((sum, o) => sum + o.progress, 0);
    if (progress) {
      progress /= result.items.length;
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

  if (listItem.items) {
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
