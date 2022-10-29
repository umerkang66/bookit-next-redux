import { Action } from '../../action';
import { CheckRoomAvailabilityActionTypes } from '../../action-types';

interface CheckRoomAvailabilityState {
  loading: boolean;
  error: string | null;
  availability: boolean | null;
}

const initialState: CheckRoomAvailabilityState = {
  loading: false,
  error: null,
  availability: null,
};

export const checkRoomAvailabilityReducer = (
  state: CheckRoomAvailabilityState = initialState,
  action: Action
): CheckRoomAvailabilityState => {
  switch (action.type) {
    case CheckRoomAvailabilityActionTypes.CHECK_ROOM_AVAILABILITY_START:
      return {
        ...state,
        loading: true,
        error: null,
        availability: null,
      };
    case CheckRoomAvailabilityActionTypes.CHECK_ROOM_AVAILABILITY_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        availability: action.payload,
      };
    case CheckRoomAvailabilityActionTypes.CHECK_ROOM_AVAILABILITY_RESET:
      return {
        ...state,
        loading: false,
        error: null,
        availability: false,
      };
    case CheckRoomAvailabilityActionTypes.CHECK_ROOM_AVAILABILITY_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
        availability: false,
      };
    default:
      return state;
  }
};
