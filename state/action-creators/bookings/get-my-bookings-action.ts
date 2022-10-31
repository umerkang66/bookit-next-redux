import axios from 'axios';
import { NextPageContext } from 'next';
import absoluteUrl from 'next-absolute-url';
import { Dispatch } from 'redux';
import { Action } from '../../action';
import { GetMyBookingsActionTypes } from '../../action-types';

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