import "isomorphic-fetch";
import fs from "fs";
import prettier from "prettier";
import Gw2Api from "../src/services/Gw2Api";
import { flatten, distinct } from "../src/utility/array";
import { buildRecipeDb } from "./recipeDb/engine";
import seedRecipes from "../data/recipes/legendaries";

let seedItems = distinct(
  flatten(
    seedRecipes.map(recipe =>
      recipe.components.map(component => component.itemId)
    )
  )
);

console.log("Locating recipes for seed items " + seedItems.join(", "));

buildRecipeDb(new Gw2Api(), seedItems)
  .then(res => {
    let recipeData = prettier.format(JSON.stringify(res), { parser: "json" });
    fs.writeFile("./data/recipes/generated.json", recipeData, err => {
      if (err) {
        return console.log(err);
      }

      console.log("Generated recipe database from seed items");
    });
  })
  .catch(console.log.bind(console));
