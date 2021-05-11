import { sign } from "jsonwebtoken";
import { Response } from "express";
import { Users } from "../entities/";

interface createAuthCookie {
  (res: Response, user: Users): boolean;
}

const createAuthCookie: createAuthCookie = (res, user) => {
  const currentTime = new Date().getTime();
  const expiresAfter = 1000 * 60 * 60 * 24 * 7; //7days

  const token = sign(
    {
      [process.env.EXPIRES!]: currentTime + expiresAfter,
      [process.env.USER_ID!]: user.id,
      [process.env.USER_SECRET!]: user.secret,
      [process.env.TOKEN_VERSION!]: user.token_version,
    },
    process.env.JWT_KEY!
  );

  const cookieName = process.env.COOKIE_NAME!;

  res.cookie(cookieName, token);

  return true;
};

export default createAuthCookie;
