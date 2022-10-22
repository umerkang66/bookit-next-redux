import { RouteHandler } from '../common-types/route-handler';

export const catchAsync = (func: RouteHandler): RouteHandler => {
  return (req, res, next) => {
    func(req, res, next)!.catch(next);
  };
};
