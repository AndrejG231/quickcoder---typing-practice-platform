import { Request } from "express";
import { validateUserFromCookie } from "../../utilities";
import { getConnection } from "typeorm";
import { ActionResponse } from "../../types";
import { Users } from "../../entities";

const changeEmail = async (
  req: Request,
  newEmail: string
): Promise<ActionResponse> => {
  //  Validate user
  const { user, error } = await validateUserFromCookie(req);

  if (!user) {
    return error!;
  }

  // Check if new email is free
  const [{ count }] = await getConnection()
    .createQueryBuilder()
    .select("COUNT(*)")
    .from(Users, "users")
    .where("email=:email", { email: newEmail })
    .execute();

  if (count) {
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

export default changeEmail;
