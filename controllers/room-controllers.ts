import Room from '../models/room';
import { CustomError } from '../utils/custom-error';
import { catchAsync } from '../utils/catch-async';
import { RouteHandler } from '../common-types/route-handler';
import { ApiFeatures } from '../utils/api-features';
import User from '../models/user';
import Booking from '../models/booking';

// ROUTES HANDLERS WITHOUT "ID"
export const allRooms: RouteHandler = catchAsync(async (req, res) => {
  const apiFeatures = new ApiFeatures(Room.find({}), req.query)
    .search()
    .filter()
    .sort()
    .getFields()
    .paginate();
  const rooms = await apiFeatures.getQuery();
  const totalRooms = await Room.countDocuments();

  res.status(200).json({
    success: true,
    totalRooms,
    length: rooms.length,
    rooms,
  });
});

export const newRoom: RouteHandler = catchAsync(async (req, res) => {
  const room = await Room.create(req.body);
  res.status(200).json({ success: true, room });
});

export const deleteAll: RouteHandler = catchAsync(async (req, res) => {
  await Room.deleteMany({});
  res.status(200).json({ success: true, rooms: null });
});

// ROUTE HANDLERS WITH "ID"
// /api/rooms/:id
export const getRoom: RouteHandler = catchAsync(async (req, res, next) => {
  const room = await Room.findById(req.query.id);

  if (!room) {
    // This will be caught by the global error handler
    return next(new CustomError('Room not found with this id', 400));
  }

  res.status(200).json({ success: true, room });
});

export const updateRoom: RouteHandler = catchAsync(async (req, res, next) => {
  const room = await Room.findById(req.query.id);
  if (!room) {
    // This will be caught by the global error handler
    return next(new CustomError('Room not found with this id', 400));
  }

  const updatedRoom = await Room.findByIdAndUpdate(req.query.id, req.body, {
    new: true,
    runValidators: true,
  });
  res.status(200).json({ success: true, room: updatedRoom });
});

export const deleteRoom: RouteHandler = catchAsync(async (req, res, next) => {
  const room = await Room.findById(req.query.id);
  if (!room) {
    // This will be caught by the global error handler
    return next(new CustomError('Room not found with this id', 400));
  }

  await room.remove();
  res.status(200).json({ success: true, room: null });
});

// require-auth runs before this
export const createRoomReview = catchAsync(async (req, res, next) => {
  const { rating, comment, roomId } = req.body;

  const user = await User.findOne({ email: req.user.email });
  const room = await Room.findById(roomId);

  if (!user || !room) {
    return next(new CustomError("Room with this id doesn't found", 400));
  }

  const review = {
    user: user._id,
    name: user.name as string,
    rating: +rating,
    comment,
  };

  const isReviewed = room.reviews.find(review => {
    return review.user.toString() === user._id.toString();
  });

  if (isReviewed) {
    // update the review
    room.reviews.forEach(review => {
      if (review.user.toString() === user._id.toString()) {
        review.comment = comment;
        review.rating = +rating;
      }
    });

    room.reviews.push(review);
    room.numOfReviews = room.reviews.length;
    room.ratings =
      room.reviews.reduce((acc, item) => item.rating + acc, 0) /
      room.reviews.length;
    await room.save();

    return res.status(200).json({
      success: true,
      message: 'Review is updated',
    });
  }

  room.reviews.push(review);
  room.numOfReviews = room.reviews.length;
  room.ratings =
    room.reviews.reduce((acc, item) => item.rating + acc, 0) /
    room.reviews.length;
  await room.save();

  res.status(200).json({ success: true, message: 'Review is created' });
});

export const checkReviewAvailability = catchAsync(async (req, res, next) => {
  const { roomId } = req.query;
  const user = await User.findOne({ email: req.user.email });

  const bookings = await Booking.find({ room: roomId, user: user?._id });

  let isReviewAvailable = false;
  if (bookings.length > 0) isReviewAvailable = true;

  res.status(200).json({ success: true, isReviewAvailable });
});
