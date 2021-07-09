import argon2 from "argon2";
import { Request } from "express";
import { Users } from "../../entities";
import { getConnection } from "typeorm";
import { ActionResponse } from "../../types";
import { generateResponse, validateUserFromCookie } from "../../utilities";

const changeUsername = async (
  req: Request,
  newUsername: string,
  password: string
): Promise<ActionResponse> => {
  //  Validate user
  const { user, error } = await validateUserFromCookie(req);

  if (!user) {
    return error!;
  }

  const authorized = await argon2.verify(user.password, password);
  if (!authorized) {
    return generateResponse(false, "login_password_invalid");
  }

  // Check if new username is free
  const [{ count }] = await getConnection()
    .createQueryBuilder()
    .select("COUNT(*)")
    .from(Users, "users")
    .where("username=:username", { username: newUsername })
    .execute();

  console.log(count);

  if (count > 0) {
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
