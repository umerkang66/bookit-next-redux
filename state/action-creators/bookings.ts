import type { NextPageContext } from 'next';
import absoluteUrl from 'next-absolute-url';
import axios from 'axios';
import { Dispatch } from 'redux';
import { Action } from '../action';
import { BookingsActionTypes } from '../action-types';

interface BookedDateReqBody {
  roomId: string;
}

export const bookedDatesAction = (reqBody: BookedDateReqBody) => {
  return async (dispatch: Dispatch<Action>) => {
    try {
      const { data } = await axios.post('/api/bookings/booked-dates', reqBody);

      dispatch({
        type: BookingsActionTypes.BOOKED_DATES,
        payload: data.bookedDates,
      });
    } catch (err: any) {
      throw new Error(err.response.data.message || 'Something went wrong');
    }
  };
};

interface CheckRoomReqBody {
  roomId: string;
  checkInDate: Date;
  checkOutDate: Date;
}

export const checkRoomAvailabilityAction = (reqBody: CheckRoomReqBody) => {
  return async (dispatch: Dispatch<Action>) => {
    try {
      const { data } = await axios.post('/api/bookings/check', reqBody);

      dispatch({
        type: BookingsActionTypes.ROOM_AVAILABILITY,
        payload: data.isAvailable,
      });
    } catch (err: any) {
      throw new Error(err.response.data.message || 'Something went wrong');
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
        type: BookingsActionTypes.GET_BOOKING,
        payload: data.booking,
      });
    } catch (err: any) {
      throw new Error(err.response.data.message || 'Something went wrong');
    }
  };
};

export const getMyBookings = (req: NextPageContext['req']) => {
  return async (dispatch: Dispatch<Action>) => {
    try {
      const { origin } = absoluteUrl(req);
      const { data } = await axios.get(`${origin}/api/bookings/me`, {
        headers: req?.headers,
      });

      dispatch({
        type: BookingsActionTypes.GET_MY_BOOKINGS,
        payload: data.bookings,
      });
    } catch (err: any) {
      throw new Error(err.response.data.message || 'Something went wrong');
    }
  };
};
