import { api } from "../static";
import { leaderboardItem } from "../types";

const practiceUserStatsQuery = `
  query getUserPracticeStats($category:String!, $practiceIndex:Int!){
  getUserPracticeStats(practiceIndex:$practiceIndex, category:$category){
    username
    score
    cpm
    errors_rate
    index
  }
}
`;

type practiceUserStatsOptions = {
  category: string;
  practiceIndex: number;
  onSuccess: (
    category: string,
    practiceIndex: number,
    item: leaderboardItem
  ) => void;
  onError: () => void;
};

const getUserPracticeStats = async ({
  category,
  practiceIndex,
  onSuccess,
  onError,
}: practiceUserStatsOptions) => {
  try {
    const queryResults = await api.post("", {
      query: practiceUserStatsQuery,
      variables: { category, practiceIndex },
    });

    const result: leaderboardItem =
      queryResults.data?.data.getUserPracticeStats;

    if (result) {
      onSuccess(category, practiceIndex, result);
    } else {
      onError();
    }
  } catch (error) {
    onError();
  }
};

export default getUserPracticeStats;
