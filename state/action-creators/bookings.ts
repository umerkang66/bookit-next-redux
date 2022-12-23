import type { NextPageContext } from 'next';
import absoluteUrl from 'next-absolute-url';
import axios from 'axios';
import { Dispatch } from 'redux';
import { Action } from '../action';
import {
  BookedDatesActionTypes,
  CheckBookingResetActionTypes,
  CheckRoomAvailabilityActionTypes,
  GetBookingActionTypes,
  GetMyBookingsActionTypes,
} from '../action-types';

interface BookedDateReqBody {
  roomId: string;
}

export const bookedDatesAction = (reqBody: BookedDateReqBody) => {
  return async (dispatch: Dispatch<Action>) => {
    dispatch({
      type: BookedDatesActionTypes.BOOKED_DATES_START,
    });

    try {
      const { data } = await axios.post('/api/bookings/booked-dates', reqBody);

      dispatch({
        type: BookedDatesActionTypes.BOOKED_DATES_SUCCESS,
        payload: data.bookedDates,
      });
    } catch (err: any) {
      dispatch({
        type: BookedDatesActionTypes.BOOKED_DATES_ERROR,
        payload: err.response.data.message || 'Something went wrong',
      });
    }
  };
};

export const checkBookingReset = () => {
  return { type: CheckBookingResetActionTypes.CHECK_BOOKING_RESET };
};

interface CheckRoomReqBody {
  roomId: string;
  checkInDate: Date;
  checkOutDate: Date;
}

export const checkRoomAvailabilityAction = (reqBody: CheckRoomReqBody) => {
  return async (dispatch: Dispatch<Action>) => {
    dispatch({
      type: CheckRoomAvailabilityActionTypes.CHECK_ROOM_AVAILABILITY_START,
    });

    try {
      const { data } = await axios.post('/api/bookings/check', reqBody);

      dispatch({
        type: CheckRoomAvailabilityActionTypes.CHECK_ROOM_AVAILABILITY_SUCCESS,
        payload: data.isAvailable,
      });
    } catch (err: any) {
      dispatch({
        type: CheckRoomAvailabilityActionTypes.CHECK_ROOM_AVAILABILITY_ERROR,
        payload: err.response.data.message || 'Something went wrong',
      });
    }
  };
};

export const getBooking = (req: NextPageContext['req'], bookingId: string) => {
  return async (dispatch: Dispatch<Action>) => {
    try {
      const { origin } = absoluteUrl(req);
      const { data } = await axios.get(`${origin}/api/bookings/${bookingId}`, {
        headers: req?.headers,
      });

      dispatch({
        type: GetBookingActionTypes.GET_BOOKING_SUCCESS,
        payload: data.booking,
      });
    } catch (err: any) {
      dispatch({
        type: GetBookingActionTypes.GET_BOOKING_ERROR,
        payload: err.response.data.message || 'Something went wrong',
      });
    }
  };
};

export const getMyBookings = (req: NextPageContext['req']) => {
  return async (dispatch: Dispatch<Action>) => {
    dispatch({ type: GetMyBookingsActionTypes.GET_MY_BOOKINGS_START });

    try {
      const { origin } = absoluteUrl(req);
      const { data } = await axios.get(`${origin}/api/bookings/me`, {
        headers: req?.headers,
      });

      dispatch({
        type: GetMyBookingsActionTypes.GET_MY_BOOKINGS_SUCCESS,
        payload: data.bookings,
      });
    } catch (err: any) {
      dispatch({
        type: GetMyBookingsActionTypes.GET_MY_BOOKINGS_ERROR,
        payload: err.response.data.message || 'Something went wrong',
      });
    }
  };
};
