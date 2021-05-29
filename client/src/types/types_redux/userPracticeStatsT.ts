import leaderboardItem from "../leaderboardItem";

export type userPracticeStats = {
  [category in string]: {
    [practiceIndex in number]: leaderboardItem | null;
  };
};

export type action =
  | {
      type: "userPracticeStats/update";
      category: string;
      practiceIndex: number;
      item: leaderboardItem;
    }
  | {
      type: "userPracticeStats/remove";
      category: string;
      practiceIndex: number;
    };

export type reducer = {
  (state: userPracticeStats, action: action): userPracticeStats;
};
