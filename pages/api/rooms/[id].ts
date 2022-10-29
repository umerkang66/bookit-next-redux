import nc from 'next-connect';
import {
  deleteRoom,
  getRoom,
  updateRoom,
} from '../../../controllers/room-controllers';
import { dbConnect } from '../../../utils/db-connect';
import { errorHandler } from '../../../middlewares';

const handler = nc({ onError: errorHandler });

handler.use(async (req, res, next) => {
  await dbConnect();
  next();
});

// routes with id
handler.get(getRoom);
handler.patch(updateRoom);
handler.delete(deleteRoom);

export default handler;
