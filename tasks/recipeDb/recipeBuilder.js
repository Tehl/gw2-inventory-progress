import { distinct, except } from "../../src/utility/array";

function RecipeBuilder() {
  this._db = {};
}

RecipeBuilder.prototype._parseEntry = function parseEntry(recipe) {
  let componentIds = [];
  let dbEntry = {
    itemId: recipe.output_item_id,
    components: recipe.ingredients.map(ingredient => {
      componentIds.push(String(ingredient.item_id));

      return {
        itemId: ingredient.item_id,
        count: ingredient.count
      };
    })
  };

  return {
    componentIds,
    dbEntry
  };
};

RecipeBuilder.prototype.record = function record(recipes) {
  let newItems = [];

  recipes.forEach(recipe => {
    let entry = this._parseEntry(recipe);

    newItems = newItems.concat(entry.componentIds);

    this._db[entry.dbEntry.itemId] = entry.dbEntry;

    console.log(
      "Recorded recipe " +
        recipe.id +
        " for item " +
        recipe.output_item_id +
        " with " +
        entry.dbEntry.components.length +
        " components"
    );
  });

  newItems = except(distinct(newItems), Object.keys(recipes));

  return newItems;
};

RecipeBuilder.prototype.results = function results() {
  return this._db;
};

export default RecipeBuilder;
