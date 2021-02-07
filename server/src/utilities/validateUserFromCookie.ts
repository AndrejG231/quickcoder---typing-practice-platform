import generateResponse from "./generateResponse";
import getCookieValue from "./getCookieValue";
import { Request } from "express";
import { verify } from "jsonwebtoken";
import Users from "../types/entities/Users";
import LangList from "../lang/typesLangList";
import UserInfoResponse from "src/types/responses/UserInfoResponse";

import dlog from "../development/dlog";

interface valUserFromCookie {
  (
    req: Request,
    clientParameter: string,
    lang: LangList
  ): Promise<UserInfoResponse>;
}

const validateUserFromCookie: valUserFromCookie = async (
  req,
  clientParameter,
  lang
) => {
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
  const currentTime = new Date().getTime();

  //...is token expired
  if (currentTime > parseInt(decodedCookie[process.env.EXPIRES!])) {
    dlog(
      "TOKEN EXPIRED: \ncurrent: ",
      new Date(currentTime),
      "\nexpire date: ",
      new Date(parseInt(decodedCookie[process.env.EXPIRES!]))
    );

    return {
      error: generateResponse(false, "getUserInfo_token_outdated", lang),
    };
  }

  //...does clientParameter match?
  if (decodedCookie[process.env.CLIENT_PARAM!] !== clientParameter) {
    dlog(
      "CLIENT PARAM NOT MATCHING: \nCookie: ",
      decodedCookie[process.env.CLIENT_PARAM!],
      "\nRecieved: ",
      clientParameter
    );

    return {
      error: generateResponse(
        false,
        "getUserInfo_clientParameter_invalid",
        lang
      ),
    };
  }

  //...is there such a user?
  const user = await Users.findOne(decodedCookie[process.env.USER_ID!]);

  if (!user) {
    dlog("NO USER FIND ON ID: ", decodedCookie[process.env.USER_ID!]);

    return {
      error: generateResponse(false, "getUserInfo_user_notFound", lang),
    };
  }

  //...does user secret match?
  if (user.secret !== decodedCookie[process.env.USER_SECRET!]) {
    dlog(
      "SECRETS DO NOT MATCH: \nUser:",
      user.secret,
      "\nCookie: ",
      decodedCookie[process.env.USER_SECRET!]
    );

    return {
      error: generateResponse(false, "getUserInfo_user_wrongSession", lang),
    };
  }

  //...does token version match?
  if (decodedCookie[process.env.TOKEN_VERSION!] !== user.token_version) {
    dlog(
      "TOKEN VERSIONS DO NOT MATCH: \nUser:",
      user.token_version,
      "\nCookie: ",
      decodedCookie[process.env.TOKEN_VERSION!]
    );

    return {
      error: generateResponse(false, "getUserInfo_token_outdated", lang),
    };
  }

  //...all good...
  return { user: user };
};

export default validateUserFromCookie;
