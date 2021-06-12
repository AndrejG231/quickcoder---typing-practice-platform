import { practiceInfo } from ".";

type userProfileOverview = {
  averageStats: {
    averageScore: number;
    averageCpm: number;
    averageErrorsRate: number;
    totalLength: number;
    finishedTimeSpent: number;
  };
  lastPractices: practiceInfo[];
};

export default userProfileOverview;
