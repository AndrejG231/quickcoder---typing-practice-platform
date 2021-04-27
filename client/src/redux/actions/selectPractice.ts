import { action } from "../../types/types_redux/practiceSelectionT";

const selectPractice = (selected: string): action => {
  return {
    type: "practiceSelect/setselect",
    selected: selected,
  };
};

export default selectPractice;
