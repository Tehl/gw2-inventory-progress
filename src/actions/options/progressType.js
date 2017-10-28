import { PROGRESS_TYPE_CHANGED } from "../../reducers/options";

function setProgressType(progressType) {
  return {
    type: PROGRESS_TYPE_CHANGED,
    payload: {
      progressType: progressType
    }
  };
}

export { setProgressType };
