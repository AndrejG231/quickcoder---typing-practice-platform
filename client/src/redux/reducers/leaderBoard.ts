import { reducer } from "../../types/types_redux/leaderBoardT";

const defaultState = {
  current: null,
  items: null,
};

const leaderBoard: reducer = (state = defaultState, action) => {
  switch (action.type) {
    case "leaderboard/set":
      return {
        current: { index: action.index, category: action.category },
        items: action.items,
      };
    default:
      return state;
  }
};

export default leaderBoard;
