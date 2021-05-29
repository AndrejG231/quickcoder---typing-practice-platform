import { action } from "../../types/types_redux/userPracticeStatsT";
import { leaderboardItem } from "../../types";

const setUserPracticeStats = (
  category: string,
  index: number,
  stat: leaderboardItem
): action => {
  return {
    type: "userPracticeStats/update",
    item: stat,
    category: category,
    practiceIndex: index,
  };
};

export default setUserPracticeStats;
