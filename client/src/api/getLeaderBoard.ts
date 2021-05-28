import { api } from "../static";
import { leaderboardItem } from "../types";

const getLeaderBoardQuery = `
  query practiceLeaderboard($category: String!, $index: Int!) {
    practiceLeaderboard(category: $category, index: $index) {
      username
      score
      cpm
      errors_rate
      index
    }
  }
`;

type getLeaderBoardOptions = {
  index: number;
  category: string;
  onSuccess: (category: string, index: number, items: leaderboardItem[]) => any;
  onError: () => void;
};

const getLeaderBoard = async ({
  index,
  category,
  onSuccess,
  onError,
}: getLeaderBoardOptions) => {
  try {
    const result = await api.post("", {
      query: getLeaderBoardQuery,
      variables: { index, category },
    });

    if (result.data?.data?.practiceLeaderboard.length > 1) {
      onSuccess(category, index, result.data.data.practiceLeaderboard);
    } else {
      onError();
    }
  } catch (err) {
    console.log(err);
    onError();
  }
};

export default getLeaderBoard;
