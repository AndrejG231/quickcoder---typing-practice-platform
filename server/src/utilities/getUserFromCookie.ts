import { Request } from "express";
import getCookieValue from "./getCookieValue";
import { UserInfoResponse } from "../types/";
import { generateResponse } from "./";
import { Users } from "../entities/";
import { verify } from "jsonwebtoken";

const getUserFromCookie = async (req: Request): Promise<UserInfoResponse> => {
  if (!req.headers.cookie) {
    return {
      error: generateResponse(false, "getUserInfo_cookies_notFound"),
    };
  }

  const cookie = getCookieValue(req.headers.cookie, process.env.COOKIE_NAME!);
  const tokenError = {
    error: generateResponse(false, "getUserInfo_token_notFound"),
  };
  const idKey = process.env.USER_ID!;

  //...is there a cookie?
  if (typeof cookie !== "string") {
    return tokenError;
  }

  try {
    const decodedCookie = verify(cookie, process.env.JWT_KEY!) as any;
    const userId = decodedCookie[idKey];

    if (!decodedCookie.hasOwnProperty(process.env.USER_ID!)) {
      return tokenError;
    }

    const user = await Users.findOne(userId);

    if (!user) {
      return {
        error: generateResponse(false, "getUserInfo_user_notFound"),
      };
    }

    return { user: user };
  } catch (err) {
    return tokenError;
  }
};

export default getUserFromCookie;
