import { Request } from "express";
import { getConnection } from "typeorm";
import { generateResponse, getUserFromCookie } from "../../utilities";
import { Practices } from "../../entities";
import { ProfileHistoryResponse } from "../../types";

const getProfileHistory = async (
  req: Request,
  lastDate?: Date
): Promise<ProfileHistoryResponse> => {
  const { user, error } = await getUserFromCookie(req);

  if (!user) {
    return { result: error! };
  }

  const practicesCount = await getConnection()
    .createQueryBuilder()
    .select(`COUNT(*) as "totalCount"`)
    .from(Practices, "practices")
    .execute();

  if (lastDate) {
    //   When practices already loaded - update with recent practices since last date
    const queryResults = await getConnection()
      .createQueryBuilder()
      .select(
        "score as score, errors_rate as error_rate, cpm, index as length, category, practice_index, created_at, id"
      )
      .from(Practices, "practices")
      .where(
        `created_at > :lastDate AND user_id = :user_id AND is_finished = :isFinished`,
        { lastDate, user_id: user.id, isFinished: true }
      )
      .orderBy("created_at", "DESC")
      .execute();

    return {
      lastPractices: queryResults.slice(0, -1),
      ...practicesCount[0],
      result: generateResponse(true, "profile_history_retrieved"),
    };
  } else {
    // Fetching history without updating

    const queryResults = await getConnection()
      .createQueryBuilder()
      .select(
        "score as score, errors_rate as error_rate, cpm, index as length, category, practice_index, created_at, id"
      )
      .from(Practices, "practices")
      .where(`user_id = :user_id AND is_finished = :isFinished`, {
        user_id: user.id,
        isFinished: true,
      })
      .orderBy("created_at", "DESC")
      .execute();

    return {
      lastPractices: queryResults,
      result: generateResponse(true, "profile_history_retrieved"),
    };
  }
};

export default getProfileHistory;
