import { practiceObject } from "../../types";
import { action } from "../../types/types_redux/practiceT";

const setPractice = (practice: practiceObject): action => {
  return {
    practice: practice,
    type: "practice/set",
  };
};

export default setPractice;
