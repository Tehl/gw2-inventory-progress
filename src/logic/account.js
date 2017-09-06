import { getInventory } from "./inventory";
import { getWallet } from "./wallet";

function getAccountData(dataService) {
  return Promise.all([
    getInventory(dataService),
    getWallet(dataService)
  ]).then(res => ({
    account: {
      inventory: res[0].inventory,
      wallet: res[1].wallet
    },
    itemIds: res[0].itemIds,
    currencyIds: res[1].currencyIds
  }));
}

export { getAccountData };
