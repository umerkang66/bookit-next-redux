import { catchAsync } from '../utils/catch-async';
import { CustomError } from '../utils/custom-error';
import { getSession } from 'next-auth/react';
import { RequestUser } from '../common-types';

declare module 'next' {
  interface NextApiRequest {
    user: RequestUser;
  }
}

export const requireAuth = catchAsync(async (req, res, next) => {
  const session = await getSession({ req });
  if (!session) {
    const error = new CustomError(
      'Please login first to access this resource',
      401
    );
    return next(error);
  }
  req.user = session.user as RequestUser;
  next();
});
