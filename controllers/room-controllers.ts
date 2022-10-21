import { NextApiRequest, NextApiResponse } from 'next';
import Room from '../models/room';

type RouteHandler = (
  req: NextApiRequest,
  res: NextApiResponse
) => void | Promise<void>;

// ROUTES HANDLERS WITHOUT "ID"
export const allRooms: RouteHandler = async (req, res) => {
  try {
    let query = Room.find({});
    if (req.query.sort) {
      const sort = req.query.sort as string;
      query = query.sort(sort.split(',').join(' '));
    }
    // if there are multiple selects, they should be separated through ","
    if (req.query.select) {
      const select = req.query.select as string;
      query = query.select(select.split(','));
    }

    const rooms = await query;

    res.status(200).json({
      success: true,
      length: rooms.length,
      rooms,
    });
  } catch (err: any) {
    res.status(400).json({
      success: false,
      error: err.message || 'Something went wrong',
    });
  }
};

export const newRoom: RouteHandler = async (req, res) => {
  try {
    const room = await Room.create(req.body);

    res.status(200).json({
      success: true,
      room,
    });
  } catch (err: any) {
    res.status(400).json({
      success: false,
      error: err.message || 'Something went wrong',
    });
  }
};

export const deleteAll: RouteHandler = async (req, res) => {
  await Room.deleteMany({});
  res.status(204).json({
    success: true,
    rooms: null,
  });
};

// ROUTE HANDLERS WITH "ID"
// /api/rooms/:id
export const getRoom: RouteHandler = async (req, res) => {
  try {
    const room = await Room.findById(req.query.id);

    if (!room) {
      res.status(400).json({
        success: false,
        error: 'Room not found with this id',
      });
      return;
    }

    res.status(200).json({
      success: true,
      room,
    });
  } catch (err: any) {
    res.status(400).json({
      success: false,
      error: err.message,
    });
  }
};

export const updateRoom: RouteHandler = async (req, res) => {
  try {
    const room = await Room.findById(req.query.id);

    if (!room) {
      res.status(400).json({
        success: false,
        error: 'Room not found with this id',
      });
      return;
    }

    const updatedRoom = await Room.findByIdAndUpdate(req.query.id, req.body, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({
      success: true,
      updatedRoom,
    });
  } catch (err: any) {
    res.status(400).json({
      success: false,
      error: err.message || 'Something went wrong',
    });
  }
};

export const deleteRoom: RouteHandler = async (req, res) => {
  try {
    const room = await Room.findById(req.query.id);

    if (!room) {
      res.status(400).json({
        success: false,
        error: 'Room not found with this id',
      });
      return;
    }

    await room.remove();

    res.status(200).json({
      success: true,
      room: null,
    });
  } catch (err: any) {
    res.status(400).json({
      success: false,
      error: err.message || 'Something went wrong',
    });
  }
};
