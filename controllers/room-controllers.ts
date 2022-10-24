import Room from '../models/room';
import { CustomError } from '../utils/custom-error';
import { catchAsync } from '../utils/catch-async';
import { RouteHandler } from '../common-types/route-handler';
import { ApiFeatures } from '../utils/api-features';

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
  res.status(204).json({ success: true, rooms: null });
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
