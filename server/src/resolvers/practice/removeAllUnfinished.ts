import { Request } from "express";
import { Practices } from "../../entities";
import { ActionResponse } from "../../types";
import { getConnection } from "typeorm";
import { generateResponse, validateUserFromCookie } from "../../utilities";

const removeAllUnfinished = async (req: Request): Promise<ActionResponse> => {
  const { user, error } = await validateUserFromCookie(req);

  if (!user) {
    return error!;
  }

  const deleteReslts = await getConnection()
    .createQueryBuilder()
    .delete()
    .from(Practices, "practices")
    .where("user_id = :user_id AND is_finished = :is_finished", {
      user_id: user.id,
      is_finished: false,
    })
    .execute();

    console.log(deleteReslts)

  if (deleteReslts.affected) {
    return generateResponse(true, "clearUnfinishedPractices_practices_cleared");
  }

  return generateResponse(false, "clearUnfinishedPractices_practices_failed");
};

export default removeAllUnfinished;
