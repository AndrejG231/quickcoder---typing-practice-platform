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

    default:
      return state;
  }
};

export default profile;
