import { getInventory } from "./inventory";
import { getWallet } from "./wallet";
import { getAchievements } from "./achievements";

function getAccountData(dataService) {
  return Promise.all([
    getInventory(dataService),
    getWallet(dataService),
    getAchievements(dataService)
  ]).then(res => ({
    account: {
      inventory: res[0].inventory,
      wallet: res[1].wallet,
      achievements: res[2].achievements
    },
    itemIds: res[0].itemIds,
    currencyIds: res[1].currencyIds
  }));
}

export { getAccountData };
