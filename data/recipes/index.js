import legendaries from "./legendaries";
import generated from "./generated";

const recipes = {
  ...generated
};

legendaries.forEach(recipe => {
  recipes[recipe.itemId] = recipe;
});

export default recipes;
