import { practiceObject, schemeCharacters } from "../types";
import { updatePractice } from "../api";

const handlePracticeProgress = (
  keyPressed: schemeCharacters,
  state: practiceObject,
  onFinish: () => void
): practiceObject => {
  /* 
  good keypress handling
  => increase index, remove "last error"
  */

  /* When practice is finished, update practice to server and fire "onFinish" function */
  if (keyPressed === state.string[state.index]) {
    const newIndex = state.index + 1;
    if (newIndex === state.string.length) {
      updatePractice({
        practiceUpdateFields: {
          errors: JSON.stringify(state.errors),
          index: newIndex,
          is_finished: true,
          time_spent:
            state.time_spent + new Date().getTime() - state.start_time,
        },
        practiceId: state.id,
      });

      onFinish();

      return {
        ...state,
        index: newIndex,
        last_error: "",
        time_spent: state.time_spent + new Date().getTime() - state.start_time,
        start_time: new Date().getTime(),
      };
    }

    /* Every 50 characters, update practice to server, save time spent and return new start time */
    if (newIndex % 50 === 0 && newIndex > 49 && state.start_time) {
      updatePractice({
        practiceUpdateFields: {
          errors: JSON.stringify(state.errors),
          index: newIndex,
          is_finished: false,
          time_spent:
            state.time_spent + new Date().getTime() - state.start_time,
        },
        practiceId: state.id,
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
      // If there is not start time setup yet, add there new time
      // => Timer not starting until first keypress
    };
  }

  /*
  bad keypress handling
  */

  let newErrors: string;
  const currentErrors = state.errors[state.index];

  // Join errors if existing on current index
  if (typeof currentErrors === "string") {
    newErrors = currentErrors + keyPressed;
  } else {
    newErrors = keyPressed;
  }

  // practice with updated errors
  return {
    ...state,
    errors: {
      ...state.errors,
      [state.index]: newErrors,
    },
    last_error: keyPressed,
  };
};

export default handlePracticeProgress;
