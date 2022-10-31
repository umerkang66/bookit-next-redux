import nc from 'next-connect';
import {
  deleteRoom,
  updateRoom,
} from '../../../../controllers/room-controllers';
import { dbConnect } from '../../../../utils/db-connect';
import { errorHandler, requireAuth } from '../../../../middlewares';
import { authorizeRoles } from '../../../../middlewares/authorize';

const handler = nc({ onError: errorHandler });

handler.use(async (req, res, next) => {
  await dbConnect();
  next();
});
handler.use(requireAuth, authorizeRoles('admin'));

// routes with id
handler.patch(updateRoom);
handler.delete(deleteRoom);

export default handler;
