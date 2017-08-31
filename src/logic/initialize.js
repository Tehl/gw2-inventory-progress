import { flatten } from "../utility/array";
import { mapKeys } from "../utility/object";
import { buildInventoryData } from "./inventory";
import { buildWalletData } from "./wallet";
import { calculateProgress } from "./progress";
import wishlist from "../data/wishlist";

function initialize(dataService) {
  return Promise.all([
    buildInventoryData(dataService),
    buildWalletData(dataService)
  ])
    .then(res => {
      return Promise.all([
        ...res,
        dataService.getItems(res[0].itemIds),
        dataService.getCurrencies(res[1].currencyIds)
      ]);
    })
    .then(res => {
      let inventory = mapKeys(res[0].inventory, (value, key) => ({
        id: key,
        owned: value.count,
        allocated: 0
      }));

      let wallet = mapKeys(res[1].wallet, (value, key) => ({
        id: key,
        owned: value.count,
        allocated: 0
      }));

      let resources = {
        inventory,
        wallet
      };

      let progress = calculateProgress(wishlist, resources);

      return progress;
    });
}

export default initialize;
