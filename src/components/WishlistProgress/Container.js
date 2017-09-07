import { connect } from "react-redux";
import {
  mapCollectionToProgress,
  calculateProgress
} from "../../logic/wishlist";
import Wishlist from "./Wishlist";

const mapStateToProps = state => {
  let resources = {
    inventory: mapCollectionToProgress(state.accountData.inventory),
    wallet: mapCollectionToProgress(state.accountData.wallet)
  };

  let progress = calculateProgress(state.wishlist, resources);

  return {
    wishlist: progress,
    gameData: state.gameData
  };
};

const WishlistContainer = connect(mapStateToProps)(Wishlist);

export default WishlistContainer;
