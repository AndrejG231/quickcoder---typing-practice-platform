import { reducer } from "../../types/types_redux/practiceT";

const practice: reducer = (state = null, action) => {
  switch (action.type) {
    case "practice/set":
      return action.practice;
    case "practice/reset":
      return null;
    default:
      return state;
  }
};

export default practice;
