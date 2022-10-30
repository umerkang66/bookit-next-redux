import axios from 'axios';
import { NextPageContext } from 'next';
import absoluteUrl from 'next-absolute-url';
import { Dispatch } from 'redux';
import { Action } from '../../action';
import { GetBookingActionTypes } from '../../action-types';

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
