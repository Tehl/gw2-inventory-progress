import { combineReducers } from "redux";
import progressType, {
  PROGRESS_TYPE_CHANGED,
  PROGRESS_TYPE_SUMMARY,
  PROGRESS_TYPE_BREAKDOWN
} from "./options/progressType";

const options = combineReducers({ progressType });

export default options;

export {
  PROGRESS_TYPE_CHANGED,
  PROGRESS_TYPE_SUMMARY,
  PROGRESS_TYPE_BREAKDOWN
};
