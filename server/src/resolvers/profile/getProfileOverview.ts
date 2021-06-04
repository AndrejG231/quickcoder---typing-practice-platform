import { Request } from "express";
import { getUserFromCookie, generateResponse } from "../../utilities";
import { ProfileOverviewResponse } from "../../types";
import { getConnection } from "typeorm";
import { Practices } from "../../entities";

const getProfileOverview = async (
  req: Request
): Promise<ProfileOverviewResponse | number> => {
  const { user, error } = await getUserFromCookie(req);

  if (!user) {
    return { result: error! };
  }

  const [averageStats] = await getConnection()
    .createQueryBuilder()
    .select(
      `
      ROUND(AVG(score)) as "averageScore",
      ROUND(AVG(cpm)) as "averageCpm",
      AVG(errors_rate) as "averageErrorsRate",
      SUM(index) as "totalLength",
      SUM(time_spent) as "finishedTimeSpent"
      `
    )
    .from(Practices, "practices")
    .where("is_finished=:is_finished AND user_id=:user_id", {
      user_id: user.id,
      is_finished: true,
    })
    .execute();

  const lastPractices = await getConnection()
    .createQueryBuilder()
    .select(
      `score, errors_rate, cpm, index as length, category, practice_index`
    )
    .from(Practices, "practices")
    .where("is_finished=:is_finished AND user_id=:user_id", {
      user_id: user.id,
      is_finished: true,
    })
    .orderBy("created_at", "ASC")
    .limit(3)
    .execute();

  const results = {
    averageStats,
    lastPractices,
    result: generateResponse(true, "profile_overview_retrieved"),
  };

  console.log(results);

  return results;
};

export default getProfileOverview;
