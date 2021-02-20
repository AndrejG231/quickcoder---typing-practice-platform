import {
  PracticeReducerT,
  PracticeAnimationReducerT,
  PracticeObject,
} from "../../types/redux/PracticeT";


export const practiceReducer: PracticeReducerT = (
  state = PracticeObject,
  action
) => {
  switch (action.type) {
    case "practice/set":
      return action.practice;
    case "practice/reset":
      return PracticeObject;
    default:
      return state;
  }
};

export const practiceAnimationReducer: PracticeAnimationReducerT = (
  state = 0,
  action
) => {
  switch (action.type) {
    case "animate":
      return state + 7.334;
    case "errorSkip":
      return state + 22;
    case "reset":
      return 0;
    default:
      return state;
  }
};
