import { action } from "../../types/types_redux/practiceT";

const resetPractice = (): action => {
  return {
    type: "practice/reset",
  };
};

export default resetPractice;
