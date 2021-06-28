import { Request } from "express";
import { Users } from "src/entities";
import { getConnection } from "typeorm";
import { ActionResponse } from "../../types";
import { validateUserFromCookie } from "../../utilities";

const changeUsername = async (
  req: Request,
  newUsername: string
): Promise<ActionResponse> => {
  //  Validate user
  const { user, error } = await validateUserFromCookie(req);

  if (!user) {
    return error!;
  }

  // Check if new username is free
  const [{ count }] = await getConnection()
    .createQueryBuilder()
    .select("COUNT(*)")
    .from(Users, "users")
    .where("username=:username", { username: newUsername })
    .execute();

  if (count) {
    return {
      success: false,
      info: "changeUsername_username_alreadyUsed",
      message: "Username is already used.,",
    };
  }

  // Try to update user with new username
  const updateResult = await getConnection()
    .createQueryBuilder()
    .update(Users)
    .set({ username: newUsername })
    .where("id=:id", { id: user.id })
    .execute();

  if (updateResult.affected) {
    return {
      success: true,
      info: "changeUsername_change_successful",
      message: "Sucessfully changed username",
    };
  }

  // return error message in case of failed update
  return {
    success: false,
    info: "changeUsername_unknow_errorOccured",
    message: "Unknown error occured.",
  };
};

export default changeUsername;
