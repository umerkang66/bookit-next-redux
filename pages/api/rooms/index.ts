import nc from 'next-connect';
import { allRooms, newRoom } from '../../../controllers/room-controllers';
import { dbConnect } from '../../../utils/db-connect';

const router = nc();

// connect the db (if not connected), before getting to any request
router.use(async (req, res, next) => {
  await dbConnect();
  next();
});

// routes
router.get(allRooms);
router.post(newRoom);

export default router;
