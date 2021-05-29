import { reducer } from "../../types/types_redux/userPracticeStatsT";

const userPracticeStats: reducer = (state = {}, action) => {
  switch (action.type) {
    case "userPracticeStats/update":
      return {
        ...state,
        [action.category]: {
          ...state[action.category],
          [action.practiceIndex]: action.item,
        },
      };
    case "userPracticeStats/remove":
      return {
        ...state,
        [action.category]: {
          ...state[action.category],
          [action.practiceIndex]: null,
        },
      };
    default:
      return state;
  }
};

export default userPracticeStats;
