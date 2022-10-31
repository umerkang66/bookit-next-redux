import { Room } from '../../../common-types/room';
import { Action } from '../../action';
import { AllAdminRoomsActionTypes } from '../../action-types';

interface AllAdminRoomsState {
  error: string | null;
  rooms: Room[];
  totalRooms: number;
}

const initialState: AllAdminRoomsState = {
  error: null,
  rooms: [],
  totalRooms: 0,
};

export const allAdminRoomsReducer = (
  state: AllAdminRoomsState = initialState,
  action: Action
): AllAdminRoomsState => {
  switch (action.type) {
    case AllAdminRoomsActionTypes.All_ADMIN_ROOMS_ERROR:
      return {
        ...state,
        error: action.payload,
        rooms: [],
        totalRooms: 0,
      };
    case AllAdminRoomsActionTypes.All_ADMIN_ROOMS_SUCCESS:
      return {
        ...state,
        error: null,
        rooms: action.payload.rooms,
        totalRooms: action.payload.totalRooms,
      };
    default:
      return state;
  }
};
