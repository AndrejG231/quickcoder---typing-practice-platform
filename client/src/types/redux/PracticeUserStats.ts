export const userStatObject: userStatObjectT = {};

type practiceUserStat = { score: number; length: number };
export type userStatObjectT = { [key in string]: practiceUserStat };

export type PracticeUserStatsActionT = {
  (stat: practiceUserStat): { type: "userStats/set"; stat: practiceUserStat };
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
