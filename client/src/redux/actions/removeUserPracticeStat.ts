import { action } from "../../types/types_redux/userPracticeStatsT";

const removeUserPracticeStat = (category: string, index: number): action => {
  return {
    type: "userPracticeStats/remove",
    category: category,
    practiceIndex: index,
  };
};

export default removeUserPracticeStat;
