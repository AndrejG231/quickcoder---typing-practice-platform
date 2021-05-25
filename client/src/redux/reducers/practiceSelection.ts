import { reducer } from "../../types/types_redux/practiceSelectionT";

const lengths = [100, 300, 500, 1000, 1500, 2000, 3000];

const defaultState = {
  selectedPractice: null,
  selectedCategory: 0,
  lengthIndex: 2,
  length: 500,
  loading: false,
  error: false,
};

const practiceSelection: reducer = (state = defaultState, action) => {
  switch (action.type) {
    case "practiceSelect/setselect":
      return {
        ...state,
        error: false,
        selectedPractice: action.selected,
      };

    case "practiceSelect/setlen":
      let length = state.lengthIndex + action.len;

      if (length < 0) {
        length = 0;
      } else if (length > 6) {
        length = 6;
      }

      return {
        ...state,
        error: false,
        lengthIndex: length,
        length: lengths[length],
      };

    case "practiceSelect/selectCategory":
      return {
        ...state,
        error: false,
        selectedPractice: null,
        selectedCategory: action.selected,
      };

    case "practiceSelect/setErrors":
      return {
        ...state,
        error: action.toggle,
      };
    case "practiceSelect/setLoading":
      return {
        ...state,
        loading: action.toggle,
      };
    default:
      return state;
  }
};

export default practiceSelection;
