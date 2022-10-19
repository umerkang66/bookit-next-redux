import { NextApiRequest, NextApiResponse } from "next";

export const allRooms = (req: NextApiRequest, res: NextApiResponse) => {
  res.status(200).json({ success: true, message: "All Rooms" });
};
