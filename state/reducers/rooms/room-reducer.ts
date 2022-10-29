import { Room } from '../../../common-types/room';
import { Action } from '../../action';
import { GetRoomActionType } from '../../action-types';

interface RoomState {
  error: string | null;
  room: Room | null;
}

const initialState: RoomState = {
  error: null,
  room: null,
};

export const roomReducer = (
  state: RoomState = initialState,
  action: Action
) => {
  switch (action.type) {
    case GetRoomActionType.GET_ROOM_ERROR:
      return { ...state, room: null, error: action.payload };
    case GetRoomActionType.GET_ROOM_SUCCESS:
      return { ...state, error: null, room: action.payload };
    default:
      return state;
  }
};
