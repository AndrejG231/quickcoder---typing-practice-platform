type userProfileOverview = {
  averageStats: {
    averageScore: number;
    averageCpm: number;
    averageErrorsRate: number;
    totalLength: number;
    finishedTimeSpent: number;
  };
  lastPractices: {
    score: number;
    error_rate: number;
    cpm: number;
    category: string;
    practice_index: number;
    length: number;
  };
};

export default userProfileOverview;