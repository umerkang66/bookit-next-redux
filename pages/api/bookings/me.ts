import nc from 'next-connect';
import { getBookingsOfUser } from '../../../controllers/booking-controllers';
import { dbConnect } from '../../../utils/db-connect';
import { requireAuth, errorHandler } from '../../../middlewares';

const handler = nc({ onError: errorHandler });

// connect the db (if not connected), before getting to any request
handler.use(async (req, res, next) => {
  await dbConnect();
  next();
});

// routes without id
handler.use(requireAuth).get(getBookingsOfUser);

export default handler;
