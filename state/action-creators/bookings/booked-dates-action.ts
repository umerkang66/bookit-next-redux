import axios from 'axios';
import { Dispatch } from 'redux';
import { Action } from '../../action';
import { BookedDatesActionTypes } from '../../action-types';

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
