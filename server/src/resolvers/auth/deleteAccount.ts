import argon2 from "argon2";
import { Request, Response } from "express";
import { getConnection } from "typeorm";
import { generateResponse, validateUserFromCookie } from "../../utilities";
import { Users } from "../../entities";
import { ActionResponse } from "../../types";

const deleteAccount = async (
  res: Response,
  req: Request,
  password: string
): Promise<ActionResponse> => {
  const { user, error } = await validateUserFromCookie(req);

  if (!user) {
    return error!;
  }

  const authorized = await argon2.verify(user.password, password);
  if (!authorized) {
    return generateResponse(false, "login_password_invalid");
  }

  res.clearCookie(process.env.COOKIE_NAME!);

  const result = await getConnection()
    .createQueryBuilder()
    .delete()
    .from(Users, "users")
    .where("id = :user_id", { user_id: user.id })
    .execute();

  if (result?.affected === 1) {
    return {
      success: true,
      info: "deleteAccount_account_deleted",
      message: "Successfully deleted account",
    };
  }

  return {
    success: false,
    info: "deleteAccount_unknown_errorOccured",
    message: "Unknown error occured.",
  };
};

export default deleteAccount;
