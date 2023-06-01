import nc from 'next-connect';
import { getRoom } from '../../../controllers/room-controllers';
import { dbConnect } from '../../../utils/db-connect';
import { errorHandler } from '../../../middlewares';

const handler = nc({ onError: errorHandler });

handler.use(async (req, res, next) => {
  await dbConnect();
  next();
});

// routes with id
handler.get(getRoom);

export default handler;
