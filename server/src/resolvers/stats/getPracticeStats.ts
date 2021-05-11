import { Request } from "express";
import { getConnection } from "typeorm";
import { Practices } from "../../entities";
import {
  calculatePracticeScore,
  generateResponse,
  getRecentStats,
  getUserFromCookie,
} from "../../utilities/";

const getPracticeStats = async (
  category: string,
  index: number,
  req: Request
) => {
  const userData = await getUserFromCookie(req);

  if (!userData.user) {
    return {
      response: userData.error,
    };
  }

  const practiceLength = (
    await getConnection()
      .createQueryBuilder()
      .select("SUM(index)")
      .from(Practices, "practices")
      .where(
        "user_id = :user_id and category = :category and practice_index = :practice_index",
        {
          user_id: userData.user.id,
          category: category,
          practice_index: index,
        }
      )
      .execute()
  )[0].sum;

  let practiceScore;
  if (practiceLength >= 500) {
    const practiceData = await getRecentStats(
      userData.user.id,
      category,
      index
    );
    practiceScore = calculatePracticeScore(practiceData);
  } else {
    practiceScore = {
      score: 0,
      cpm: 0,
      error_rate: 0,
    };
  }

  return {
    response: generateResponse(true, "practiceStats_stats_retrieved"),
    stats: [
      {
        ...practiceScore,
        length: practiceLength,
        index,
        category,
      },
    ],
  };
};

export default getPracticeStats;
