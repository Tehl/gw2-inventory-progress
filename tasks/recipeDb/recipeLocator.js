import duplicatedRecipes from "../../data/duplicatedRecipes";

// normally we discard items which have multiple potential recipes.
// however, some items have the same recipe split across several
// professions with different recipe ids, which must be included
function checkForDuplicatedRecipes(recipeList) {
  if (recipeList.length < 2) {
    return recipeList;
  }

  const override = recipeList.filter(o => duplicatedRecipes.indexOf(o) > -1);
  if (override.length === 1) {
    return override;
  }

  return recipeList;
}

function getRecipesForItems(dataService, items) {
  const validItems = items.filter(o => o);

  if (!validItems.length) {
    console.log("No items to locate recipes for");
    return;
  }

  console.log("Locating recipes for items " + validItems.join(", "));

  return Promise.all(
    validItems.map(itemId => dataService.findRecipesFor(itemId))
  ).then(res => {
    // discard items with multiple sources
    let recipeIds = res
      .map(checkForDuplicatedRecipes)
      .filter(o => o.length === 1)
      .map(o => o[0]);
    if (!recipeIds.length) {
      console.log("No recipes to retrieve");

      return [];
    }

    console.log("Retrieving recipes " + recipeIds.join(", "));

    return dataService.getRecipes(recipeIds);
  });
}

export { getRecipesForItems };
