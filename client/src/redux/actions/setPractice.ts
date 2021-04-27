import { practiceObject } from "../../types";
import { action } from "../../types/types_redux/practiceT";

const setNewPractice = (practice: practiceObject): action => {
  return {
    practice: practice,
    type: "practice/set",
  };
};

export default setNewPractice;
