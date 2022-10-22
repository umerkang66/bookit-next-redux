import { NextApiRequest, NextApiResponse } from 'next';
import { NextHandler } from 'next-connect';

export type RouteHandler = (
  req: NextApiRequest,
  res: NextApiResponse,
  next: NextHandler
) => void | Promise<void>;
