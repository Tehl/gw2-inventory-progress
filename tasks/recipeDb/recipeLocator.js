function getRecipesForItems(dataService, items) {
  console.log("Locating recipes for items " + items.join(", "));

  return Promise.all(
    items.map(itemId => dataService.findRecipesFor(itemId))
  ).then(res => {
    // discard items with multiple sources
    let recipeIds = res.filter(o => o.length === 1).map(o => o[0]);
    if (!recipeIds.length) {
      console.log("No recipes to retrieve");

      return [];
    }

    console.log("Retrieving recipes " + recipeIds.join(", "));

    return dataService.getRecipes(recipeIds);
  });
}

export { getRecipesForItems };
