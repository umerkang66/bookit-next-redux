import { Action } from '../action';
import { BookingsActionTypes } from '../action-types';

import { BookingPopulated } from '../../common-types/booking';
import { combineReducers } from 'redux';

interface BookingState {
  booking: BookingPopulated | null;
}

const bookingReducer = (
  state: BookingState = { booking: null },
  action: Action
): BookingState => {
  switch (action.type) {
    case BookingsActionTypes.GET_BOOKING:
      return { ...state, booking: action.payload };
    default:
      return state;
  }
};

interface BookedDatesState {
  bookedDates: string[][];
}

const bookedDatesReducer = (
  state: BookedDatesState = { bookedDates: [] },
  action: Action
): BookedDatesState => {
  switch (action.type) {
    case BookingsActionTypes.BOOKED_DATES:
      return { ...state, bookedDates: action.payload };
    default:
      return state;
  }
};

interface CheckRoomAvailabilityState {
  availability: boolean | null;
}

const checkRoomAvailabilityReducer = (
  state: CheckRoomAvailabilityState = { availability: null },
  action: Action
): CheckRoomAvailabilityState => {
  switch (action.type) {
    case BookingsActionTypes.ROOM_AVAILABILITY:
      return { ...state, availability: action.payload };
    default:
      return state;
  }
};

interface MyBookingsState {
  bookings: BookingPopulated[];
}

const myBookingsReducer = (
  state: MyBookingsState = { bookings: [] },
  action: Action
): MyBookingsState => {
  switch (action.type) {
    case BookingsActionTypes.GET_MY_BOOKINGS:
      return { ...state, bookings: action.payload };
    default:
      return state;
  }
};

export const bookingsReducer = combineReducers({
  booking: bookingReducer,
  bookedDates: bookedDatesReducer,
  roomAvailability: checkRoomAvailabilityReducer,
  myBookings: myBookingsReducer,
});
