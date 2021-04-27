import { reducer } from "../../types/types_redux/animationsT";

const defaultState = {
  modal: false,
  home: false,
};

const animations: reducer = (state = defaultState, action) => {
  switch (action.type) {
    case "animeIn":
      return { ...state, [action.field]: true };
    case "animeOut":
      return { ...state, [action.field]: false };
    default:
      return state;
  }
};

export default animations;
