import {
  practiceUserStatsReducerT,
  userStatObject,
} from "../../types/redux/PracticeUserStats";

export const practiceUserStatsReducer: practiceUserStatsReducerT = (
  state = userStatObject,
  action
) => {
  switch (action.type) {
    case "userStats/set":
      return { ...state, ...action.stat };
    default:
      return state;
  }
};
