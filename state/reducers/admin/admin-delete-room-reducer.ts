import { Action } from '../../action';
import { AdminDeleteRoomActionTypes } from '../../action-types';

interface AdminDeleteRoomState {
  loading: boolean;
  error: string | null;
  successMessage: string | null;
}

const initialState: AdminDeleteRoomState = {
  loading: false,
  error: null,
  successMessage: null,
};

export const adminDeleteRoomReducer = (
  state: AdminDeleteRoomState = initialState,
  action: Action
): AdminDeleteRoomState => {
  switch (action.type) {
    case AdminDeleteRoomActionTypes.ADMIN_DELETE_ROOM_START:
      return {
        ...state,
        loading: true,
        error: null,
        successMessage: null,
      };
    case AdminDeleteRoomActionTypes.ADMIN_DELETE_ROOM_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
        successMessage: null,
      };
    case AdminDeleteRoomActionTypes.ADMIN_DELETE_ROOM_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        successMessage: 'Deleted Successfully',
      };
    default:
      return state;
  }
};
