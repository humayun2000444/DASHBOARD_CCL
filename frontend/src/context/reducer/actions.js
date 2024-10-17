import { GET__SELECTED__MENU } from "./actionsTypes";

export const getSelectedMenu = (menuTitle, dispatch) => {
  dispatch({
    type: GET__SELECTED__MENU,
    payload: menuTitle,
  });
};
