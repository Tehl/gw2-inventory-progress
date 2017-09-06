import { ITEM_DATA_UPDATED } from "../../reducers/gameData";

function loadItemData(dataService, itemIds) {
  return dispatch => {
    return dataService.getItems(itemIds).then(res => {
      dispatch({
        type: ITEM_DATA_UPDATED,
        payload: {
          items: res.map(item => ({
            id: item.id,
            name: item.name
          }))
        }
      });
    });
  };
}

export { loadItemData };
