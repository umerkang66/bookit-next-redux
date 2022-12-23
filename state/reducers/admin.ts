import { Action } from '../action';
import { AdminActionTypes } from '../action-types';
import { Room } from '../../common-types/room';
import { combineReducers } from 'redux';

interface AllAdminRoomsState {
  rooms: Room[];
  totalRooms: number;
}

const allAdminRoomsReducer = (
  state: AllAdminRoomsState = {
    rooms: [],
    totalRooms: 0,
  },
  action: Action
): AllAdminRoomsState => {
  switch (action.type) {
    case AdminActionTypes.ALL_ROOMS:
      return {
        ...state,
        rooms: action.payload.rooms,
        totalRooms: action.payload.totalRooms,
      };
    default:
      return state;
  }
};

interface AdminNewRoomState {
  room: Room | null;
}

const adminNewRoomReducer = (
  state: AdminNewRoomState = { room: null },
  action: Action
): AdminNewRoomState => {
  switch (action.type) {
    case AdminActionTypes.NEW_ROOM:
      return { ...state, room: action.payload };
    default:
      return state;
  }
};

interface AdminUpdateRoomState {
  room: Room | null;
}

const adminUpdateRoomReducer = (
  state: AdminUpdateRoomState = { room: null },
  action: Action
): AdminUpdateRoomState => {
  switch (action.type) {
    case AdminActionTypes.UPDATE_ROOM:
      return { ...state, room: action.payload };
    default:
      return state;
  }
};

interface AdminDeleteRoomState {
  successMessage: string | null;
}

const adminDeleteRoomReducer = (
  state: AdminDeleteRoomState = { successMessage: null },
  action: Action
): AdminDeleteRoomState => {
  switch (action.type) {
    case AdminActionTypes.DELETE_ROOM:
      return { ...state, successMessage: 'Deleted Successfully' };
    default:
      return state;
  }
};

export const adminReducer = combineReducers({
  newRoom: adminNewRoomReducer,
  deleteRoom: adminDeleteRoomReducer,
  allRooms: allAdminRoomsReducer,
  updateRoom: adminUpdateRoomReducer,
});
