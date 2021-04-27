import { reducer } from "../../types/types_redux/userPracticeStatsT";

const userPracticeStats: reducer = (state = {}, action) => {
  switch (action.type) {
    case "userStats/set":
      return { ...state, ...action.stat };
    default:
      return state;
  }
};

export default userPracticeStats;
