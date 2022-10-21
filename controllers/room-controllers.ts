import { NextApiRequest, NextApiResponse } from 'next';
import Room from '../models/room';

type RouteHandler = (
  req: NextApiRequest,
  res: NextApiResponse
) => void | Promise<void>;

export const allRooms: RouteHandler = (req, res) => {
  res.status(200).json({ success: true, message: 'All Rooms' });
};

export const newRoom: RouteHandler = async (req, res) => {
  try {
    const room = await Room.create(req.body);
    res.status(200).json({ success: true, room });
  } catch (err: any) {
    res.status(400).json({
      success: false,
      error: err.message,
    });
  }
};
