export const userStatObject: userStatObjectT = {};

type practiceUserStat = { score: number; length: number, cpm: number, error_rate: number };
export type userStatObjectT = { [key in string]: practiceUserStat };

export type PracticeUserStatsActionT = {
  (stat: userStatObjectT): PracticeUserStatsActionObjectT;
};

export type PracticeUserStatsActionObjectT = {
  type: "userStats/set";
  stat: userStatObjectT;
};

export type practiceUserStatsReducerT = {
  (
    type: userStatObjectT,
    action: PracticeUserStatsActionObjectT
  ): userStatObjectT;
};
