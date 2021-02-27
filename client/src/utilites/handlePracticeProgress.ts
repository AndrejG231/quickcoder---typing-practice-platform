import { HandleProgressFunctionT } from "../types/redux/PracticeT";
import ReduxStore from "../redux/reduxStore";
import { skipPracticeOffset } from "../redux/actions/practiceActions";

const HandlePracticeProgress: HandleProgressFunctionT = (keyPressed, state) => {
  if (!state.isActive) {
    return state;
  }
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
        lastError: "",
      };
    }
    //Continue practice
    return {
      ...state,
      index: newIndex,
      lastError: "",
      startTime: state.index === 0 ? new Date().getTime() : state.startTime,
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

  ReduxStore.dispatch(skipPracticeOffset());

  return {
    ...state,
    errors: {
      ...state.errors,
      [state.index]: newErrors,
    },
    lastError: keyPressed,
    errorsCount: state.errorsCount + 1,
  };
};

export default HandlePracticeProgress;
