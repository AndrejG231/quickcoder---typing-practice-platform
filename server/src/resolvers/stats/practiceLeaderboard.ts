import { Practices, Users } from "../../entities";
import { PracticeLeaderboardResponse } from "../../types/";
import { getConnection } from "typeorm";

const practiceLeaderboard = async (
  category: string,
  index: number
): Promise<PracticeLeaderboardResponse[]> => {
  const queryResults = await getConnection()
    .createQueryBuilder()
    .select("*")
    .from(Practices, "practices")
    .leftJoin(Users, "users", "users.id = practices.user_id")
    .where(
      "category= :category AND is_finished=:is_finished AND practice_index=:index AND user_id >= 0",
      {
        category,
        index,
        is_finished: true,
      }
    )
    .limit(10)
    .orderBy("score", "DESC")
    .execute();

  console.log(queryResults);

  return queryResults;
};

export default practiceLeaderboard;
