import { PracticeUserStatsActionT } from "../../types/redux/PracticeUserStats";

export const setPracticeUserStatsAction: PracticeUserStatsActionT = (stat) => {
  return {
    type: "userStats/set",
    stat: stat,
  };
};
