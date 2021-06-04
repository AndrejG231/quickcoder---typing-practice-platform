import { getConnection } from "typeorm";
import { RecentPracticeStats } from "../types";
import { Practices } from "../entities/";

interface getRecentPractice {
  (
    userId: number,
    category: string,
    index: number
  ): Promise<RecentPracticeStats>
}

const getRecentPracticeStats: getRecentPractice = async (
  userId,
  category,
  index
) => {
  const practices = await getConnection()
    .createQueryBuilder()
    .select("*")
    .from(Practices, "practice")
    .where(
      "user_id = :userId AND category=:category AND practice_index=:practice_index AND is_finished = true",
      {
        userId: userId,
        category: category,
        practice_index: index,
      }
    )
    .orderBy("created_at", "DESC")
    .limit(10)
    .execute();

  const result = {
    errors_count: 0,
    time_spent: 0,
    index: 0,
  };

  for (let i = 0; i < practices.length; i++) {
    if (result.index < 1000) {
      result.index += practices[i].index;
      result.time_spent += practices[i].time_spent;
      result.errors_count += practices[i].errors_count;
      continue;
    }
    break;
  }

  return result;
};

export default getRecentPracticeStats;
