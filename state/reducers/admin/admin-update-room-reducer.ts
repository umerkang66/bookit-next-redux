import { Room } from '../../../common-types/room';
import { Action } from '../../action';
import { AdminUpdateRoomActionTypes } from '../../action-types';

interface AdminUpdateRoomState {
  loading: boolean;
  error: string | null;
  room: Room | null;
}

const initialState: AdminUpdateRoomState = {
  loading: false,
  error: null,
  room: null,
};

export const adminUpdateRoomReducer = (
  state: AdminUpdateRoomState = initialState,
  action: Action
): AdminUpdateRoomState => {
  switch (action.type) {
    case AdminUpdateRoomActionTypes.ADMIN_UPDATE_ROOM_START:
      return {
        ...state,
        loading: true,
        error: null,
        room: null,
      };
    case AdminUpdateRoomActionTypes.ADMIN_UPDATE_ROOM_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
        room: null,
      };
    case AdminUpdateRoomActionTypes.ADMIN_UPDATE_ROOM_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        room: action.payload,
      };
    default:
      return state;
  }
};
