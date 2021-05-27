import { Practices, Users } from "../../entities";
import { practiceLeaderboardResponse } from "../../types/responses";
import { getConnection } from "typeorm";

const practiceLeaderboard = async (
  category: string,
  index: number
): Promise<practiceLeaderboardResponse[]> => {
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
    .execute();

  console.log(queryResults);

  return queryResults;
};

export default practiceLeaderboard;
