import { Room } from '../../../common-types/room';
import { Action } from '../../action';
import { AdminNewRoomActionTypes } from '../../action-types';

interface AdminNewRoomState {
  loading: boolean;
  error: string | null;
  room: Room | null;
}

const initialState: AdminNewRoomState = {
  loading: false,
  error: null,
  room: null,
};

export const adminNewRoomReducer = (
  state: AdminNewRoomState = initialState,
  action: Action
): AdminNewRoomState => {
  switch (action.type) {
    case AdminNewRoomActionTypes.ADMIN_NEW_ROOM_START:
      return {
        ...state,
        loading: true,
        error: null,
        room: null,
      };
    case AdminNewRoomActionTypes.ADMIN_NEW_ROOM_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
        room: null,
      };
    case AdminNewRoomActionTypes.ADMIN_NEW_ROOM_SUCCESS:
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
