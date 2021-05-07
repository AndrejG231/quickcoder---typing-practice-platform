import { Request, Response } from "express";

type graphqlContext = {
  res: Response;
  req: Request;
};

export default graphqlContext;
