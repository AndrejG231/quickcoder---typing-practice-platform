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
      if (!state.history?.lastPractices.length) {
        return {
          ...state,
          history: action.history,
          awaitingHistoryUpdate: false,
        };
      }

      return {
        ...state,
        history: {
          lastPractices: [
            ...action.history.lastPractices,
            ...state.history.lastPractices,
          ],
          totalCount: action.history.totalCount,
        },
        awaitingHistoryUpdate: false,
      };

    case "profile/resetHistory":
      return {
        ...state,
        history: null,
      };

    case "profile/toggleHistoryRefresh":
      return {
        ...state,
        awaitingHistoryUpdate: action.refresh,
      };

    // Defaults //
    case "profile/resetAll":
      return defaultState;

    default:
      return state;
  }
};

export default profile;
