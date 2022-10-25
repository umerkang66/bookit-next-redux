import { User, Room } from '../../common-types';
import {
  AllRoomsActionType,
  GetRoomActionType,
  SignupActionTypes,
} from '../action-types';

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

interface SignupUserStartAction {
  type: SignupActionTypes.SIGNUP_USER_START;
}
interface SignupUserSuccessAction {
  type: SignupActionTypes.SIGNUP_USER_SUCCESS;
  payload: string;
}
interface SignupUserErrorAction {
  type: SignupActionTypes.SIGNUP_USER_ERROR;
  payload: string;
}

export type Action =
  | AllRoomsSuccessAction
  | AllRoomsErrorAction
  | GetRoomSuccessAction
  | GetRoomErrorAction
  | SignupUserStartAction
  | SignupUserSuccessAction
  | SignupUserErrorAction;
