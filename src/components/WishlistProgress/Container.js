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
  let achievements = state.accountData.achievements;

  let progress = calculateProgress(state.wishlist, resources, achievements);

  return {
    wishlist: progress,
    gameData: state.gameData
  };
};

const WishlistContainer = connect(mapStateToProps)(Wishlist);

export default WishlistContainer;
