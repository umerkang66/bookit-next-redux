import { BookingPopulated } from '../../../common-types/booking';
import { Action } from '../../action';
import { GetMyBookingsActionTypes } from '../../action-types';

interface MyBookingsState {
  loading: boolean;
  error: string | null;
  bookings: BookingPopulated[];
}

const initialState: MyBookingsState = {
  loading: false,
  error: null,
  bookings: [],
};

export const myBookingsReducer = (
  state: MyBookingsState = initialState,
  action: Action
): MyBookingsState => {
  switch (action.type) {
    case GetMyBookingsActionTypes.GET_MY_BOOKINGS_START:
      return {
        ...state,
        loading: true,
        error: null,
        bookings: [],
      };
    case GetMyBookingsActionTypes.GET_MY_BOOKINGS_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        bookings: action.payload,
      };
    case GetMyBookingsActionTypes.GET_MY_BOOKINGS_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
        bookings: [],
      };
    default:
      return state;
  }
};
