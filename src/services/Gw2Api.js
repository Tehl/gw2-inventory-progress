import { flatten } from "../utility/array";

const apiRoot = "https://api.guildwars2.com/v2";

function Gw2Api(apiKey) {
  this._apiKey = apiKey;
}

Gw2Api.prototype._apiFetch = function apiFetch(uri, authenticated) {
  let params = {
    method: "GET",
    headers: {
      Accept: "application/json"
    }
  };
  let remoteUri = apiRoot + uri;

  if (authenticated && this._apiKey) {
    if (remoteUri.indexOf("?") > -1) {
      remoteUri += "&";
    } else {
      remoteUri += "?";
    }
    remoteUri += "access_token=" + this._apiKey;
  }

  return fetch(remoteUri, params).then(res => res.json());
};

Gw2Api.prototype._distributedFetch = function distributedFetch(
  workload,
  uriFactory,
  authenticated
) {
  const workQuantity = 100;

  let offset = 0;
  let work = [];
  while (offset < workload.length) {
    work.push(
      this._apiFetch(
        uriFactory(workload.slice(offset, offset + workQuantity)),
        authenticated
      )
    );
    offset += workQuantity;
  }

  return Promise.all(work).then(res => flatten(res));
};

Gw2Api.prototype.getItems = function getItems(ids) {
  return this._distributedFetch(
    ids,
    partial => "/items?ids=" + partial.join(","),
    false
  );
};

Gw2Api.prototype.getPrices = function getPrices(ids) {
  return this._distributedFetch(
    ids,
    partial => "/commerce/prices?ids=" + partial.join(","),
    false
  );
};

Gw2Api.prototype.getCurrencies = function getCurrencies(ids) {
  return this._distributedFetch(
    ids,
    partial => "/currencies?ids=" + partial.join(","),
    false
  );
};

Gw2Api.prototype.getCharacters = function getCharacters() {
  return this._apiFetch("/characters", true);
};

Gw2Api.prototype.getInventory = function getInventory(characterId) {
  return this._apiFetch(
    "/characters/" + encodeURIComponent(characterId) + "/inventory",
    true
  );
};

Gw2Api.prototype.getBank = function getBank() {
  return this._apiFetch("/account/bank", true);
};

Gw2Api.prototype.getMaterialStorage = function getMaterialStorage() {
  return this._apiFetch("/account/materials", true);
};

Gw2Api.prototype.getWallet = function getWallet() {
  return this._apiFetch("/account/wallet", true);
};

Gw2Api.prototype.findRecipesFor = function findRecipesFor(itemId) {
  return this._apiFetch("/recipes/search?output=" + itemId, false);
};

Gw2Api.prototype.getRecipes = function getRecipes(ids) {
  return this._distributedFetch(
    ids,
    partial => "/recipes?ids=" + partial.join(","),
    false
  );
};

export default Gw2Api;
