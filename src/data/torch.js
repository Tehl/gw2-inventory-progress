export default {
  name: "Ascended Torch",
  items: [
    { itemId: 74918, count: 1 }, // Wild Abandon
    { itemId: 19721, count: 5 }, // Glob of Ectoplasm
    {
      name: "Anthology of Heroes",
      items: [{ currencyId: 23, count: 10 }] // Spirit Shard
    },
    {
      name: "Viper's Orichalcum Imbued Inscription",
      items: [
        {
          name: "Recipe: Viper's Orichalcum Imbued Inscription",
          items: [
            { currencyId: 22, count: 250 }, // Lump of Aurillium
            { currencyId: 1, count: 1000 } // Coin
          ]
        },
        {
          name: "Orichalcum Plated Dowel",
          items: [
            { itemId: 19685, count: 15 }, // Orichalcum Ingot
            { itemId: 19712, count: 10 } // Ancient Wood Plank
          ]
        },
        { itemId: 19721, count: 5 }, // Glob of Ectoplasm
        { itemId: 74328, count: 30 }, // Leaf Fossil
        { itemId: 76491, count: 3 } // Black Diamond
      ]
    }
  ]
};
