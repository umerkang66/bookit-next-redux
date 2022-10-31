import nc from 'next-connect';
import { checkReviewAvailability } from '../../../controllers/room-controllers';
import { dbConnect } from '../../../utils/db-connect';
import { errorHandler, requireAuth } from '../../../middlewares';

const handler = nc({ onError: errorHandler });

// connect the db (if not connected), before getting to any request
handler.use(async (req, res, next) => {
  await dbConnect();
  next();
});

handler.use(requireAuth).get(checkReviewAvailability);

export default handler;
