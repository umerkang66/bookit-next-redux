import { Room } from '../../common-types/room';
import { AllRoomsActionType, GetRoomActionType } from '../action-types';

interface AllRoomsSuccessAction {
  type: AllRoomsActionType.All_ROOMS_SUCCESS;
  payload: { rooms: Room[]; totalRooms: number };
}
interface AllRoomsErrorAction {
  type: AllRoomsActionType.All_ROOMS_ERROR;
  // this should error message
  payload: string;
}

interface GetRoomSuccessAction {
  type: GetRoomActionType.GET_ROOM_SUCCESS;
  payload: Room;
}
interface GetRoomErrorAction {
  type: GetRoomActionType.GET_ROOM_ERROR;
  payload: string;
}

export type Action =
  | AllRoomsSuccessAction
  | AllRoomsErrorAction
  | GetRoomSuccessAction
  | GetRoomErrorAction;
