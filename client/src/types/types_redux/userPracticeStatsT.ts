export type userPracticeStats = {
  [key in string]: {
    score: number;
    length: number;
    cpm: number;
    error_rate: number;
  };
};

export type action = {
  type: "userStats/set";
  stat: userPracticeStats;
};

export type reducer = {
  (stat: userPracticeStats, action: action): userPracticeStats;
};
