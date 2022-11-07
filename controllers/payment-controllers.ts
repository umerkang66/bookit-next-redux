import Room from '../models/room';
import User from '../models/user';
import Booking from '../models/booking';

import { catchAsync } from '../utils/catch-async';
import absoluteUrl from 'next-absolute-url';
import getRawBody from 'raw-body';

const stripe = require('stripe')(process.env.STRIPE_SECRET);

export const stripeCheckoutSession = catchAsync(async (req, res) => {
  const room = await Room.findById(req.query.roomId);
  const { origin } = absoluteUrl(req);

  const { checkInDate, checkOutDate, daysOfStay } = req.query;

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    success_url: `${origin}/bookings/me`,
    cancel_url: `${origin}/room/${room?._id}`,
    customer_email: req.user.email,
    client_reference_id: req.query.roomId,
    metadata: { checkInDate, checkOutDate, daysOfStay },
    line_items: [
      {
        name: room?.name,
        images: [room?.images[0].url],
        amount: parseInt(req.query.amount as string) * 100, // cents
        currency: 'usd',
        quantity: 1,
      },
    ],
  });

  res.status(200).json({
    success: true,
    session,
  });
});

export const webhookCheckout = catchAsync(async (req, res) => {
  try {
    const signature = req.headers['stripe-signature'];
    const rawBody = await getRawBody(req);

    const event = stripe.webhooks.constructEvent(
      rawBody,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET
    );

    if (event.type === 'checkout.session.completed') {
      const session = event.data.object;

      const room = session.client_reference_id;
      const user = (await User.findOne({ email: session.customer_email }))?.id;

      const amountPaid = session.amount_total / 100; // dollars
      const paymentInfo = {
        id: session.payment_intent,
        status: session.payment_status,
      };

      const checkInDate = session.metadata.checkInDate;
      const checkOutDate = session.metadata.checkOutDate;
      const daysOfStay = session.metadata.daysOfStay;

      Booking.create({
        room,
        user,
        checkInDate,
        checkOutDate,
        daysOfStay,
        amountPaid,
        paymentInfo,
        paidAt: Date.now(),
      });

      res.status(200).json({
        success: true,
      });
    }
  } catch (err: any) {
    res.status(500).json({
      success: false,
    });
  }
});

// stripe listen --events checkout.session.completed --forward-to localhost:3000/api/webhook

// 2022-11-07T00:00:00.000Z,
// 2022-11-10T00:00:00.000Z
