import { leaderboardItem } from "../../types";
import { action } from "../../types/types_redux/leaderBoardT";

const setLeaderBoard = (
  category: string,
  index: number,
  items: leaderboardItem[]
): action => ({
  type: "leaderboard/set",
  category: category,
  index: index,
  items: items,
});

export default setLeaderBoard;