import { RouteHandler } from '../common-types';
import User from '../models/user';
import { CustomError } from '../utils/custom-error';

export const authorizeRoles = (...authorizedRoles: string[]): RouteHandler => {
  return async (req, res, next) => {
    const user = await User.findOne({ email: req.user.email });

    if (!user) {
      return next(new CustomError('User with id does not exist', 400));
    }

    if (!authorizedRoles.includes(user.role)) {
      const msg = `Role (${user.role}) is not allowed to access this resource`;
      return next(new CustomError(msg, 401));
    }

    next();
  };
};
