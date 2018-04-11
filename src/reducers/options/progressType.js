const PROGRESS_TYPE_CHANGED = "PROGRESS_TYPE_CHANGED";
const PROGRESS_TYPE_SUMMARY = "SUMMARY";
const PROGRESS_TYPE_BREAKDOWN = "BREAKDOWN";

const progressType = (state = PROGRESS_TYPE_BREAKDOWN, action) => {
  switch (action.type) {
    case PROGRESS_TYPE_CHANGED:
      return action.payload.progressType;

    default:
      return state;
  }
};

export default progressType;

export {
  PROGRESS_TYPE_CHANGED,
  PROGRESS_TYPE_SUMMARY,
  PROGRESS_TYPE_BREAKDOWN
};
