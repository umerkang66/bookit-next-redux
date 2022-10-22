import nc from 'next-connect';
import {
  allRooms,
  deleteAll,
  newRoom,
} from '../../../controllers/room-controllers';
import { dbConnect } from '../../../utils/db-connect';
import { errorHandler } from '../../../middlewares/error-handler';

const handler = nc({ onError: errorHandler });

// connect the db (if not connected), before getting to any request
handler.use(async (req, res, next) => {
  await dbConnect();
  next();
});

// routes without id
handler.get(allRooms);
handler.post(newRoom);
handler.delete(deleteAll);

export default handler;
