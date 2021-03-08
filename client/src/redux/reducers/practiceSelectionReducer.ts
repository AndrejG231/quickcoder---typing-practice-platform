import {
  practiceSelectionReducerT,
  practiceSelectionState,
} from "../../types/redux/PracticeSelectionT";

const lengths = [100, 300, 500, 1000, 1500, 2000, 3000];

export const practiceSelectionReducer: practiceSelectionReducerT = (
  state = practiceSelectionState,
  action
) => {
  switch (action.type) {
    case "practiceSelect/setselect":
      return { ...state, selected: action.selected };

    case "practiceSelect/setlen":
      let length = state.lengthIndex + action.len;

      if (length < 0) {
        length = 0;
      } else if (length > 6) {
        length = 6;
      }

      return { ...state, lengthIndex: length, length: lengths[length] };

    default:
      return state;
  }
};
