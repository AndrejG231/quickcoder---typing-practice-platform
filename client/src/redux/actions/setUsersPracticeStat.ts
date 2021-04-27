import {
  action,
  userPracticeStats,
} from "../../types/types_redux/userPracticeStatsT";

const setPracticeUserStats = (stat: userPracticeStats): action => {
  return {
    type: "userStats/set",
    stat: stat,
  };
};

export default setPracticeUserStats;
