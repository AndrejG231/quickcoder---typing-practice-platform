import { Request } from "express";
import { getRecentStats } from "../../utilities/";
import { getConnection } from "typeorm";
import { Practices } from "../../entities";
import { PracticeStat } from "../../types/";
import {
  calculatePracticeScore,
  generateResponse,
  getUserFromCookie,
} from "../../utilities";

const getUserStats = async (req: Request) => {
  const userData = await getUserFromCookie(req);
  if (userData.user?.id === undefined) {
    return {
      response: userData.error,
    };
  }

  const stats: PracticeStat[] = await getConnection()
    .createQueryBuilder()
    .select(
      "SUM(index) as length, category as category, practice_index as practice_index"
    )
    .from(Practices, "practices")
    .where("user_id = :user_id", { user_id: userData.user.id })
    .groupBy("category, practice_index")
    .execute();

  for (let i = 0; i < stats.length; i++) {
    if (stats[i].length >= 500) {
      const { errors_count, time_spent, index } = await getRecentStats(
        userData.user.id,
        stats[i].category,
        stats[i].practice_index
      );
      stats[i] = {
        ...stats[i],
        ...calculatePracticeScore({ errors_count, time_spent, index }),
      };
    } else {
      stats[i] = { ...stats[i], score: 0, cpm: 0, error_rate: 0 };
    }
  }

  return {
    response: generateResponse(true, "practiceStats_stats_retrieved"),
    stats: stats,
  };
};

export default getUserStats;
