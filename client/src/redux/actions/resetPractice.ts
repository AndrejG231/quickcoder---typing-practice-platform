import { action } from "../../types/types_redux/practiceT";

const resetPractice = () => {
  return {
    type: "practice/reset",
  };
};

export default resetPractice;
