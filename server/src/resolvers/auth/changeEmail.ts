import argon2 from "argon2";
import { Request } from "express";
import { generateResponse, validateUserFromCookie } from "../../utilities";
import { getConnection } from "typeorm";
import { ActionResponse } from "../../types";
import { Users } from "../../entities";

const changeEmail = async (
  req: Request,
  newEmail: string,
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

  // Check if new email is free
  const [{ count }] = await getConnection()
    .createQueryBuilder()
    .select("COUNT(*)")
    .from(Users, "users")
    .where("email=:email", { email: newEmail })
    .execute();

  if (count > 0) {
    return {
      success: false,
      info: "changeEmail_email_used",
      message: "Email is already used.,",
    };
  }

  // Try to update user with new email
  const updateResult = await getConnection()
    .createQueryBuilder()
    .update(Users)
    .set({ email: newEmail })
    .where("id=:id", { id: user.id })
    .execute();

  //  TODO: SEND EMAIL VERIFICATION MAIL

  if (updateResult.affected) {
    return {
      success: true,
      info: "changeEmail_change_successful",
      message: "Sucessfully changed username",
    };
  }

  // return error message in case of failed update
  return {
    success: false,
    info: "changeEmail_unknown_errorOccured",
    message: "Unknown error occured.",
  };
};

export default changeEmail;
