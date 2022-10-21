import { NextApiRequest, NextApiResponse } from 'next';
import Room from '../models/room';

type RouteHandler = (
  req: NextApiRequest,
  res: NextApiResponse
) => void | Promise<void>;

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
  res.send(null);
};
