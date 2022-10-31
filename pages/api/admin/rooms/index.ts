import nc from 'next-connect';
import { getAdminAllRooms } from '../../../../controllers/room-controllers';
import { dbConnect } from '../../../../utils/db-connect';
import { errorHandler, requireAuth } from '../../../../middlewares';
import { authorizeRoles } from '../../../../middlewares/authorize';

const handler = nc({ onError: errorHandler });

// connect the db (if not connected), before getting to any request
handler.use(async (req, res, next) => {
  await dbConnect();
  next();
});

// routes without id
handler.use(requireAuth, authorizeRoles('admin')).get(getAdminAllRooms);

export default handler;
