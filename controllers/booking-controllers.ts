import Booking from '../models/booking';
import { catchAsync } from '../utils/catch-async';
import { CustomError } from '../utils/custom-error';

// require-auth will run before this
export const newBooking = catchAsync(async (req, res) => {
  const {
    room,
    checkInDate,
    checkOutDate,
    daysOfStay,
    amountPaid,
    paymentInfo,
    paidAt,
  } = req.body;

  const booking = await Booking.create({
    room,
    user: req.user._id,
    checkInDate,
    checkOutDate,
    daysOfStay,
    amountPaid,
    paymentInfo,
    paidAt,
  });

  res.status(200).json({
    success: true,
    booking,
  });
});
