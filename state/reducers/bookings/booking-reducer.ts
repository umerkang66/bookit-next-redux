import { BookingPopulated } from '../../../common-types/booking';
import { Action } from '../../action';
import { GetBookingActionTypes } from '../../action-types';

interface BookingState {
  error: string | null;
  booking: BookingPopulated | null;
}

const initialState: BookingState = {
  error: null,
  booking: null,
};

export const bookingReducer = (
  state: BookingState = initialState,
  action: Action
): BookingState => {
  switch (action.type) {
    case GetBookingActionTypes.GET_BOOKING_SUCCESS:
      return {
        ...state,
        error: null,
        booking: action.payload,
      };
    case GetBookingActionTypes.GET_BOOKING_ERROR:
      return {
        ...state,
        error: action.payload,
        booking: null,
      };
    default:
      return state;
  }
};
