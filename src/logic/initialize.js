import { flatten } from "../utility/array";
import { buildInventoryData } from "./inventory";

function initialize(dataService) {
  return buildInventoryData(dataService)
    .then(res => {
      return Promise.all([dataService.getItems(res.itemIds), res.inventory]);
    })
    .then(res => {
      let items = res[0];
      let inventory = res[1];

      items.forEach(item => {
        let inventoryItem = inventory[item.id];
        if (!inventoryItem) {
          return;
        }

        inventoryItem.name = item.name;
      });

      return {
        items,
        inventory
      };
    });
}

export default initialize;
