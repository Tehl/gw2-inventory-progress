const API_KEY_CHANGED = "API_KEY_CHANGED";

const apiKey = (state = "", action) => {
  switch (action.type) {
    case API_KEY_CHANGED:
      return action.payload.apiKey;

    default:
      return state;
  }
};

export default apiKey;

export { API_KEY_CHANGED };
