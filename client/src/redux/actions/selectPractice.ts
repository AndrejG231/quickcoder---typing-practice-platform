import { action } from "../../types/types_redux/practiceSelectionT";
import { practiceMenuItem } from "../../types";

const selectPractice = (selected: practiceMenuItem): action => {
  return {
    type: "practiceSelect/setselect",
    selected: selected,
  };
};

export default selectPractice;
