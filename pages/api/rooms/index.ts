import nc from "next-connect";
import { allRooms } from "../../../controllers/room-controllers";

const handler = nc().get(allRooms);

export default handler;
