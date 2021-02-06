import {Request, Response} from 'express';

interface GraphqlContext{
  res: Response,
  req: Request
}

export default GraphqlContext