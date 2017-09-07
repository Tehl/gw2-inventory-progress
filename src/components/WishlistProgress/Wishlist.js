import React from "react";
import WishlistItem from "./WishlistItem";

import "./Wishlist.less";

const Wishlist = ({ wishlist, gameData }) =>
  <div className="wishlist-progress">
    {wishlist.map((item, idx) =>
      <WishlistItem key={idx} item={item} gameData={gameData} />
    )}
  </div>;

export default Wishlist;
