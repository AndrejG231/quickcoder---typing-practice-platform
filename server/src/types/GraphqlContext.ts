import { Request, Response } from "express";
import { envVars } from "../enviromental";

type graphqlContext = {
  res: Response;
  req: Request;
  enviromental: typeof envVars;
};

export default graphqlContext;
