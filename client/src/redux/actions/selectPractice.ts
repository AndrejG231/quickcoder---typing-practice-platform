import { action } from "../../types/types_redux/practiceSelectionT";
import { practiceItem } from "../../types";

const selectPractice = (selected: practiceItem): action => {
  return {
    type: "practiceSelect/setselect",
    selected: selected,
  };
};

export default selectPractice;
