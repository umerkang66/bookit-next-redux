import nc from 'next-connect';
import { webhookCheckout } from '../../controllers/payment-controllers';
import { dbConnect } from '../../utils/db-connect';
import { errorHandler } from '../../middlewares';

const handler = nc({ onError: errorHandler });

// connect the db (if not connected), before getting to any request
handler.use(async (req, res, next) => {
  await dbConnect();
  next();
});

export const config = { api: { bodyParser: false } };

// routes without id
handler.post(webhookCheckout);

export default handler;
