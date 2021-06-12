import { reducer } from "../../types/types_redux/profileT";

const defaultState = {
  overview: null,
  history: null,
  awaitingHistoryUpdate: false,
};

const profile: reducer = (state = defaultState, action) => {
  switch (action.type) {
    // Profile Overview //
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

    // Profile History //
    case "profile/loadHistory":
      return {
        ...state,
        history: action.history,
      };

    case "profile/updateHistory":
      return {
        ...state,
        history: { ...action.history, ...state.history },
      };

    case "profile/resetHistory":
      return {
        ...state,
        history: null,
      };

    // Defaults //
    case "profile/resetAll":
      return defaultState;

    default:
      return state;
  }
};

export default profile;
