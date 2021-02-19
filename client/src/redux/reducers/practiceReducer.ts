import {
  PracticeReducerT,
  PracticeAnimationReducerT,
  HandleProgressFunctionT,
  PracticeObject,
} from "../../types/redux/PracticeT";

const HandlePracticeProgress: HandleProgressFunctionT = (keyPressed, state) => {
  //matched case

  if (keyPressed === state.string[state.index]) {
    const newIndex = state.index + 1;
    //Finished pracice
    if (newIndex === state.string.length) {
      return {
        ...state,
        isActive: false,
        isFinished: true,
        index: newIndex,
      };
    }
    //Continue practice
    return {
      ...state,
      index: newIndex,
    };
  }
  // bad key case
  let newErrors: string;
  const currentErrors = state.errors[state.index];

  if (typeof currentErrors === "string") {
    newErrors = currentErrors + keyPressed;
  } else {
    newErrors = keyPressed;
  }

  return {
    ...state,
    errors: {
      ...state.errors,
      [state.index]: newErrors,
    },
  };
};

export const practiceReducer: PracticeReducerT = (
  state = PracticeObject,
  action
) => {
  switch (action.type) {
    case "practice/set":
      return action.practice;
    case "practice/progress":
      return HandlePracticeProgress(action.character, state);
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
      return state + 5.5;
    case "errorSkip":
      return state + 22;
    case "reset":
      return 0;
    default:
      return state;
  }
};
