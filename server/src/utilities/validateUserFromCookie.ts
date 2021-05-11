import generateResponse from "./generateResponse";
import getCookieValue from "./getCookieValue";
import { Request } from "express";
import { verify } from "jsonwebtoken";
import Users from "../entities/Users";
import UserInfoResponse from "../types/responses/userInfoResponse";

interface valUserFromCookie {
  (req: Request): Promise<UserInfoResponse>;
}

const validateUserFromCookie: valUserFromCookie = async (req) => {
  if (!req.headers.cookie) {
    return {
      error: generateResponse(false, "getUserInfo_cookies_notFound"),
    };
  }
  const cookie = getCookieValue(req.headers.cookie, process.env.COOKIE_NAME!);

  //...is there a cookie?
  if (typeof cookie !== "string") {
    return {
      error: generateResponse(false, "getUserInfo_token_notFound"),
    };
  }

  const decodedCookie = verify(cookie, process.env.JWT_KEY!) as any;
  const currentTime = new Date().getTime();

  //...is token expired
  if (currentTime > parseInt(decodedCookie[process.env.EXPIRES!])) {
    return {
      error: generateResponse(false, "getUserInfo_token_outdated"),
    };
  }

  //...is there such a user?
  const user = await Users.findOne(decodedCookie[process.env.USER_ID!]);

  if (!user) {
    return {
      error: generateResponse(false, "getUserInfo_user_notFound"),
    };
  }

  //...does user secret match?
  if (user.secret !== decodedCookie[process.env.USER_SECRET!]) {
    return {
      error: generateResponse(false, "getUserInfo_user_wrongSession"),
    };
  }

  //...does token version match?
  if (decodedCookie[process.env.TOKEN_VERSION!] !== user.token_version) {
    return {
      error: generateResponse(false, "getUserInfo_token_outdated"),
    };
  }

  //...all good...
  return { user: user };
};

export default validateUserFromCookie;
