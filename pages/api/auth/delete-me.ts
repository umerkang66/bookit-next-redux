import nc from 'next-connect';
import { deleteMe } from '../../../controllers/auth-controllers';
import { dbConnect } from '../../../utils/db-connect';
import { errorHandler, requireAuth } from '../../../middlewares';

const handler = nc({ onError: errorHandler });

// connect the db (if not connected), before getting to any request
handler.use(async (req, res, next) => {
  await dbConnect();
  next();
});

// routes without id
handler.use(requireAuth).delete(deleteMe);

export default handler;
