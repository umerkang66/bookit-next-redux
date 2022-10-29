import nc from 'next-connect';
import { dbConnect } from '../../../utils/db-connect';
import { errorHandler } from '../../../middlewares';
import { deleteAllUsers } from '../../../controllers/auth-controllers';

const handler = nc({ onError: errorHandler });

// connect the db (if not connected), before getting to any request
handler.use(async (req, res, next) => {
  await dbConnect();
  next();
});

handler.delete(deleteAllUsers);

export default handler;
