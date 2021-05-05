import { action } from "../../types/types_redux/practiceSelectionT";

const selectCategory = (selected: number): action => {
  return {
    type: "practiceSelect/selectCategory",
    selected: selected,
  };
};

export default selectCategory;
