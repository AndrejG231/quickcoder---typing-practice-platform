import { reducer } from "../../types/types_redux/practiceMenuT";

const defaultState = null;

const practiceMenu: reducer = (state = defaultState, action) => {
  switch (action.type) {
    case "menu/set":
      return action.menu;
    default:
      return state;
  }
};

export default practiceMenu;
