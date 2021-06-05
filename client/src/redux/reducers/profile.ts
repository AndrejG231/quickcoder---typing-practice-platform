import { reducer } from "../../types/types_redux/profileT";

const defaultState = {
  overview: null,
};

const profile: reducer = (state = defaultState, action) => {
  switch (action.type) {
    case "profile/setOverview":
      return {
        ...state,
        overview: action.overview,
      };

    case "profile/resetOverview":
      return {
        ...state,
        overview: defaultState.overview,
      };

    case "profile/resetAll":
      return defaultState;

    default:
      return state;
  }
};

export default profile;
