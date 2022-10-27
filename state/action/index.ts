import { User, Room } from '../../common-types';
import {
  AllRoomsActionType,
  CurrentUserActionTypes,
  GetRoomActionType,
  SignupActionTypes,
  UpdateUserActionTypes,
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
  // this would be an success message
  payload: string;
}
interface SignupUserErrorAction {
  type: SignupActionTypes.SIGNUP_USER_ERROR;
  // this should error message
  payload: string;
}

interface GetCurrentuserStartAction {
  type: CurrentUserActionTypes.GET_CURRENTUSER_START;
}
interface GetCurrentuserSuccessAction {
  type: CurrentUserActionTypes.GET_CURRENTUSER_SUCCESS;
  payload: User;
}
interface GetCurrentuserErrorAction {
  type: CurrentUserActionTypes.GET_CURRENTUSER_ERROR;
  payload: string;
}

interface UpdateUserStartAction {
  type: UpdateUserActionTypes.UPDATE_USER_START;
}
interface UpdateUserSuccessAction {
  type: UpdateUserActionTypes.UPDATE_USER_SUCCESS;
  // this would be an success message
  payload: string;
}
interface UpdateUserErrorAction {
  type: UpdateUserActionTypes.UPDATE_USER_ERROR;
  // this should error message
  payload: string;
}

export type Action =
  | AllRoomsSuccessAction
  | AllRoomsErrorAction
  | GetRoomSuccessAction
  | GetRoomErrorAction
  | SignupUserStartAction
  | SignupUserSuccessAction
  | SignupUserErrorAction
  | GetCurrentuserStartAction
  | GetCurrentuserSuccessAction
  | GetCurrentuserErrorAction
  | UpdateUserStartAction
  | UpdateUserSuccessAction
  | UpdateUserErrorAction;
