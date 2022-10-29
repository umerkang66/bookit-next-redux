import nc from 'next-connect';
import { dbConnect } from '../../../../utils/db-connect';
import { errorHandler } from '../../../../middlewares';
import { resetPassword } from '../../../../controllers/auth-controllers';

const handler = nc({ onError: errorHandler });

// connect the db (if not connected), before getting to any request
handler.use(async (req, res, next) => {
  await dbConnect();
  next();
});

handler.post(resetPassword);

export default handler;
