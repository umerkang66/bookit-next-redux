import Booking from '../models/booking';
import User from '../models/user';
import { catchAsync } from '../utils/catch-async';
import Moment from 'moment';
import { extendMoment } from 'moment-range';
import { CustomError } from '../utils/custom-error';

// @ts-ignore
const moment = extendMoment(Moment);

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

  const user = await User.findOne({ email: req.user.email });

  const booking = await Booking.create({
    room,
    user: user?.id,
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

export const checkRoomAvailability = catchAsync(async (req, res) => {
  const { roomId, checkInDate, checkOutDate } = req.body;

  // if a booking exist, where its checkInDate is
  // less than current checkOutDate AND if the
  // checkOutDate is greater than checkInDate, then
  // room is not available
  const bookings = await Booking.find({
    room: roomId,
    $and: [
      { checkInDate: { $lte: checkOutDate } },
      { checkOutDate: { $gte: checkInDate } },
    ],
  });

  res.status(200).json({
    success: true,
    isAvailable: bookings.length === 0,
  });
});

export const getBookedDates = catchAsync(async (req, res) => {
  const { roomId } = req.body;

  const bookings = await Booking.find({
    room: roomId,
  });
  const bookedDates = bookings.map(booking => {
    const range = moment.range(
      moment(booking.checkInDate),
      moment(booking.checkOutDate)
    );
    return Array.from(range.by('day'));
  });

  res.status(200).json({
    success: true,
    bookedDates,
  });
});

export const getBookingsOfUser = catchAsync(async (req, res) => {
  const user = await User.findOne({ email: req.user.email });

  const bookings = await Booking.find({
    user: user?.id,
  }).populate([
    { path: 'room', model: 'Room', select: 'name price images' },
    { path: 'user', model: 'User', select: 'name email' },
  ]);

  res.status(200).json({
    success: true,
    bookings,
  });
});

export const getBookingDetails = catchAsync(async (req, res, next) => {
  const booking = await Booking.findById(req.query.bookingId).populate([
    { path: 'room', model: 'Room', select: 'name price images' },
    { path: 'user', model: 'User', select: 'name email' },
  ]);

  if (!booking) {
    return next(new CustomError('Booking with this id is not found', 400));
  }

  res.status(200).json({
    success: true,
    booking,
  });
});
