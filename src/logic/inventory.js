import { flatten, distinct } from "../utility/array";
import { getOrAdd } from "../utility/dictionary";

function getCharacterContents(characters, dataService) {
  return characters.map(characterId =>
    dataService.getInventory(characterId).then(inventory =>
      inventory.bags.map(bag => ({
        source: characterId,
        items: bag.inventory
      }))
    )
  );
}

function getBankContents(dataService) {
  return dataService.getBank().then(res => ({
    source: "Bank",
    items: res
  }));
}

function getMaterialStorageContents(dataService) {
  return dataService.getMaterialStorage().then(res => ({
    source: "Material Storage",
    items: res
  }));
}

function compileContents(inventoryData) {
  let inventory = {};
  let itemIds = [];

  inventoryData.forEach(itemData => {
    itemData.items.filter(item => item != null).forEach(item => {
      itemIds.push(item.id);

      let dbEntry = getOrAdd(inventory, item.id, () => ({
        id: item.id,
        count: 0,
        sources: {}
      }));
      dbEntry.count += item.count;

      let sourceEntry = getOrAdd(dbEntry.sources, itemData.source, () => ({
        source: itemData.source,
        count: 0
      }));
      sourceEntry.count += item.count;
    });
  });

  itemIds = distinct(itemIds);

  return {
    inventory,
    itemIds
  };
}

function buildInventoryData(dataService) {
  return dataService
    .getCharacters()
    .then(characters =>
      Promise.all([
        ...getCharacterContents(characters, dataService),
        getBankContents(dataService),
        getMaterialStorageContents(dataService)
      ])
    )
    .then(res => {
      let inventoryData = flatten(res);

      return compileContents(inventoryData);
    });
}

export { buildInventoryData };
