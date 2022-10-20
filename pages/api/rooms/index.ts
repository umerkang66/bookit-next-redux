import nc from "next-connect";
import { allRooms, newRoom } from "../../../controllers/room-controllers";
import { dbConnect } from "../../../utils/db-connect";

dbConnect();

const handler = nc();

handler.get(allRooms);
handler.post(newRoom);

export default handler;
