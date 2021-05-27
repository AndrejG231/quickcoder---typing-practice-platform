import { leaderboardItem } from "../";

export type leaderBoard = {
  current: { index: number; category: string } | null;
  items: leaderboardItem[] | null;
};

export type action = {
  type: "leaderboard/set";
  items: leaderboardItem[];
  index: number;
  category: string;
};

export type reducer = { (state: leaderBoard, action: action): leaderBoard };
