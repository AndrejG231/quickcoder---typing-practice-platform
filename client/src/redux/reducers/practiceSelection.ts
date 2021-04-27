import { reducer } from "../../types/types_redux/practiceSelectionT";

const lengths = [100, 300, 500, 1000, 1500, 2000, 3000];

const defaultState = {
  selectedName: "",
  lengthIndex: 2,
  length: 500,
};

const practiceSelection: reducer = (state = defaultState, action) => {
  switch (action.type) {
    case "practiceSelect/setselect":
      return { ...state, selectedName: action.selected };

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

export default practiceSelection;
