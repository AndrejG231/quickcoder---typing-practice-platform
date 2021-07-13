import { Request } from "express";
import { getConnection } from "typeorm";
import { generateResponse, getUserFromCookie } from "../../utilities";
import { Practices } from "../../entities";
import { UnfinishedPracticesResponse } from "../../types";

const getUnfinishedPractices = async (
  req: Request
): Promise<UnfinishedPracticesResponse> => {
  const { user, error } = await getUserFromCookie(req);

  if (!user) {
    return { result: error! };
  }

  const queryResults = await getConnection()
    .createQueryBuilder()
    .select(
      "created_at, id, category, practice_index, LENGTH(string) as length, (100 * index / length(string)) as completion"
    )
    .from(Practices, "practices")
    .where(
      `user_id = :user_id AND is_finished = :isFinished  AND category != 'test'`,
      {
        user_id: user.id,
        isFinished: false,
      }
    )
    .orderBy("created_at", "DESC")
    .execute();

  return {
    result: generateResponse(true, "unfinishedPractices_profile_retrieved"),
    practices: queryResults,
  };
};

export default getUnfinishedPractices;
