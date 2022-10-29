import axios from 'axios';
import { Dispatch } from 'redux';
import { Action } from '../../action';
import { GetMyBookingsActionTypes } from '../../action-types';

export const getMyBookings = () => {
  return async (dispatch: Dispatch<Action>) => {
    dispatch({ type: GetMyBookingsActionTypes.GET_MY_BOOKINGS_START });

    try {
      const { data } = await axios.get('/api/bookings/me');

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
