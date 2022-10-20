import nc from "next-connect";
import { allRooms } from "../../../controllers/room-controllers";
import { dbConnect } from "../../../utils/db-connect";

dbConnect();

const handler = nc();
handler.get(allRooms);

export default handler;
