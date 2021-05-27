import { reducer } from "../../types/types_redux/leaderBoardT";

const defaultState = {};

const leaderBoard: reducer = (state, action) => {
  switch (action.type) {
    case "leaderboard/set":
      return {
        current: { index: action.index, category: action.category },
        items: action.items,
      };
  }
};

export default leaderBoard;
