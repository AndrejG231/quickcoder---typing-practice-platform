import { practiceObject, schemeCharacters } from "../types";

const HandlePracticeProgress = (
  keyPressed: schemeCharacters,
  state: practiceObject
): practiceObject => {
  //matched case
  if (keyPressed === state.string[state.index]) {
    const newIndex = state.index + 1;
    //Finished pracice
    if (newIndex === state.string.length) {
      return {
        ...state,
        is_active: false,
        is_finished: true,
        index: newIndex,
        last_error: "",
      };
    }
    //Continue practice
    return {
      ...state,
      index: newIndex,
      last_error: "",
      start_time: state.index === 0 ? new Date().getTime() : state.start_time,
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
    last_error: keyPressed,
    errors_count: state.errors_count + 1,
  };
};

export default HandlePracticeProgress;
