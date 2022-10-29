import axios from 'axios';
import { Dispatch } from 'redux';
import { Action } from '../action';
import { CheckRoomAvailabilityActionTypes } from '../action-types';

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
