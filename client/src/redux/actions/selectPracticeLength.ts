import { action } from "../../types/types_redux/practiceSelectionT";

const selectPracticeLength = (len: number): action => {
  return {
    type: "practiceSelect/setlen",
    len: len,
  };
};

export default selectPracticeLength;
