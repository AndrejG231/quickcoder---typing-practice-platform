import { sign } from "jsonwebtoken";
import {Response} from "express"
import Users from "src/types/entities/Users";

interface createAuthCookie{
  (res: Response, user: Users, clientParameter: string): boolean
}

const createAuthCookie: createAuthCookie = (res, user, clientParameter) => {
  const currentTime = new Date().getTime() 
  const expiresAfter = 1000*60*60*24*7 //7days

  const token = sign(
    {
      expires: currentTime + expiresAfter,
      userId: user.id,
      tokenVersion: user.token_version,
      clientParameter: clientParameter,
    },
    process.env.JWT_KEY!
  );

  const cookieName = process.env.COOKIE_NAME!;

  res.cookie(cookieName, token);

  console.log("NEW EXPIRE ", currentTime + expiresAfter)
  return true
};

export default createAuthCookie;