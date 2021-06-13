import { Request } from "express";
import { generateResponse, validateUserFromCookie } from "../../utilities";
import { Practices } from "../../entities";
import { getConnection } from "typeorm";
import { ActionResponse } from "../../types";

const deletePractice = async (
  req: Request,
  practiceId: number
): Promise<ActionResponse> => {
  const { user, error } = await validateUserFromCookie(req);

  if (!user) {
    return error!;
  }

  const deleteResults = await getConnection()
    .createQueryBuilder()
    .delete()
    .from(Practices, "practices")
    .where("user_id = :user_id AND id = :id AND is_finished = :is_finished", {
      id: practiceId,
      user_id: user.id,
      is_finished: false,
    })
    .execute();

  if (deleteResults.affected) {
    return generateResponse(true, "updatePracticeObject_practice_updated");
  }

  return generateResponse(false, "updatePracticeObject_practice_failed");
};

export default deletePractice;
