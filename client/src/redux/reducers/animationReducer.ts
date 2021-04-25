import { animationsReducerT, animationStateT } from "../../types/redux/AnimeT";

const animationState: animationStateT = {
  modal: false,
};

export const animationReducer: animationsReducerT = (
  state = animationState,
  action
) => {
  switch (action.type) {
    case "animeIn":
      return { ...state, [action.field]: true };
    case "animeOut":
      return { ...state, [action.field]: false };
    default:
      return state;
  }
};
