import nc from 'next-connect';
import { allRooms, newRoom } from '../../../controllers/room-controllers';
import { dbConnect } from '../../../utils/db-connect';

const handler = nc();

// connect the db (if not connected), before getting to any request
handler.use(async (req, res, next) => {
  await dbConnect();
  next();
});

// routes
handler.get(allRooms);
handler.post(newRoom);

export default handler;
