import { Response, Request } from "express";
import createAuthCookie from "src/utilities/auth/createAuthCookie";
import validateUserFromCookie from "src/utilities/auth/validateUserFromCookie";

const getSignedUser = async (res: Response, req: Request) => {
  const validationData = await validateUserFromCookie(req);

  if (!validationData.user?.id) {
    console.log("Validation data Error", validationData);
    return validationData;
  }

  createAuthCookie(res, validationData.user);
  return { user: validationData.user };
};

export default getSignedUser;
