import RecipeBuilder from "./recipeBuilder";
import { getRecipesForItems } from "./recipeLocator";

function processItemsInternal(dataService, builder, items) {
  console.log("Processing items " + items.join(", "));
  return getRecipesForItems(dataService, items)
    .then(res => builder.record(res))
    .then(newItems => {
      if (newItems.length) {
        console.log("Generated " + newItems.length + " new items to process");
        return processItemsInternal(dataService, builder, newItems);
      } else {
        console.log("No new items to process");
      }
    });
}

function buildRecipeDb(dataService, items) {
  let builder = new RecipeBuilder();

  return processItemsInternal(dataService, builder, items).then(() =>
    builder.results()
  );
}

export { buildRecipeDb };
