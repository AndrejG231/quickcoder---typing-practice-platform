import { getConnection } from "typeorm";
import RecentPracticeStats from "../../types/recentPracticeStats";
import Practices from "../../entities/Practices";

interface getRecentPractice {
  (userId: number, practiceName: string): Promise<RecentPracticeStats>;
}

const getRecentPracticeStats: getRecentPractice = async (
  userId,
  practiceName
) => {
  const practices = await getConnection()
    .createQueryBuilder()
    .select("*")
    .from(Practices, "practice")
    .where(
      "user_id = :userId AND practice_name = :practiceName AND is_finished = true",
      {
        userId: userId,
        practiceName: practiceName,
      }
    )
    .orderBy("created_at", "DESC")
    .limit(20)
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
