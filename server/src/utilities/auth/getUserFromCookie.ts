import { Request } from "express";
import getCookieValue from "../getCookieValue";
import dlog from "../../development/dlog";
import UserInfoResponse from "src/types/responses/UserInfoResponse";
import generateResponse from "../generateResponse";
import Users from "../../entities/Users";
import LangList from "../../lang/typesLangList"
import { verify } from "jsonwebtoken";

interface userFromCookie {
  (req: Request, lang: LangList): Promise<UserInfoResponse>
}

const getUserFromCookie: userFromCookie = async (req, lang) => {
  if (!req.headers.cookie) {
    dlog("COOKIES NOT FOUND", req.headers.cookie);

    return {
      error: generateResponse(false, "getUserInfo_cookies_notFound", lang),
    };
  }

  const cookie = getCookieValue(req.headers.cookie, process.env.COOKIE_NAME!);

  //...is there a cookie?
  if (typeof cookie !== "string") {
    dlog("JWT COOKIE NOT FOUND: ", cookie);

    return {
      error: generateResponse(false, "getUserInfo_token_notFound", lang),
    };
  }

  const decodedCookie = verify(cookie, process.env.JWT_KEY!) as any;

  const user = await Users.findOne(decodedCookie[process.env.USER_ID!]);

  if (!user) {
    dlog("NO USER FIND ON ID: ", decodedCookie[process.env.USER_ID!]);

    return {
      error: generateResponse(false, "getUserInfo_user_notFound", lang),
    };
  }

  return {user: user}
};

export default getUserFromCookie;
