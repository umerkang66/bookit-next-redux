import { Room } from '../../common-types/room';
import { Action } from '../action';
import { AllRoomsActionType } from '../action-types';

interface AllRoomsState {
  error: string | null;
  rooms: Room[];
}

const initialState: AllRoomsState = {
  error: null,
  rooms: [],
};

export const allRoomsReducer = (
  state: AllRoomsState = initialState,
  action: Action
): AllRoomsState => {
  switch (action.type) {
    case AllRoomsActionType.All_ROOMS_ERROR:
      return { ...state, error: action.payload, rooms: [] };
    case AllRoomsActionType.All_ROOMS_SUCCESS:
      return { ...state, error: null, rooms: action.payload };
    default:
      return state;
  }
};
