import { connect } from "react-redux";
import {
  mapCollectionToProgress,
  calculateProgressBreakdown,
  calculateProgressSummary
} from "../../logic/wishlist";
import { PROGRESS_TYPE_SUMMARY } from "../../reducers/options";
import Wishlist from "./Wishlist";

const mapStateToProps = state => {
  const resources = {
    inventory: mapCollectionToProgress(state.accountData.inventory),
    wallet: mapCollectionToProgress(state.accountData.wallet)
  };
  const achievements = state.accountData.achievements;
  const progressType = state.options.progressType;

  const calculateProgress =
    progressType === PROGRESS_TYPE_SUMMARY
      ? calculateProgressSummary
      : calculateProgressBreakdown;

  const progress = calculateProgress(state.wishlist, resources, achievements);

  return {
    wishlist: progress,
    gameData: state.gameData
  };
};

const WishlistContainer = connect(mapStateToProps)(Wishlist);

export default WishlistContainer;
