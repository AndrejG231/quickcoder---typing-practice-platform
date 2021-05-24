import { practiceObject, schemeCharacters } from "../types";
import { updatePractice } from "../api";

const handlePracticeProgress = (
  keyPressed: schemeCharacters,
  state: practiceObject,
  onFinish: (practice: practiceObject) => void
): practiceObject => {
  //matched case
  if (keyPressed === state.string[state.index]) {
    const newIndex = state.index + 1;
    //Finished pracice

    if (newIndex === state.string.length) {
      const newPractice: practiceObject = {
        ...state,
        is_active: false,
        is_finished: true,
        last_error: "",
        time_spent: new Date().getTime() - state.start_time,
        start_time: -1,
      };

      onFinish({
        ...newPractice,
        index: newIndex,
      });

      return newPractice;
    }
    //Continue practice
    if (newIndex % 50 === 0 && newIndex > 49 && state.start_time) {
      updatePractice({
        practiceUpdateFields: {
          errors: JSON.stringify(state.errors),
          errors_count: state.errors_count,
          index: newIndex,
          is_finished: false,
          time_spent:
            state.time_spent + new Date().getTime() - state.start_time,
        },
        id: state.id,
      });

      return {
        ...state,
        index: newIndex,
        last_error: "",
        time_spent: state.time_spent + new Date().getTime() - state.start_time,
        start_time: new Date().getTime(),
      };
    }

    return {
      ...state,
      index: newIndex,
      last_error: "",
      start_time: state.start_time ? state.start_time : new Date().getTime(),
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

export default handlePracticeProgress;
