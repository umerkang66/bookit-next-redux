import { NextApiRequest, NextApiResponse } from "next";
import Room from "../models/room";

type Handler = (
  req: NextApiRequest,
  res: NextApiResponse
) => void | Promise<void>;

export const allRooms: Handler = (req, res) => {
  res.status(200).json({ success: true, message: "All Rooms" });
};

export const newRoom: Handler = async (req, res) => {
  try {
    const room = await Room.create(req.body);
    res.status(200).json({ success: true, room });
  } catch (err: any) {
    res.status(400).json({
      success: false,
      error: err.message
    })
  }
};
