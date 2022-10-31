import { Dispatch } from 'redux';
import axios from 'axios';
import { AdminNewRoomActionTypes } from '../../action-types';
import { Action } from '../../action';

// this search is actually search by location
export const adminNewRoomAction = (roomData: any) => {
  return async (dispatch: Dispatch<Action>) => {
    dispatch({
      type: AdminNewRoomActionTypes.ADMIN_NEW_ROOM_START,
    });

    try {
      let link = '/api/admin/rooms';
      const { data } = await axios.post(link, roomData);

      dispatch({
        type: AdminNewRoomActionTypes.ADMIN_NEW_ROOM_SUCCESS,
        payload: data.room,
      });
    } catch (err: any) {
      dispatch({
        type: AdminNewRoomActionTypes.ADMIN_NEW_ROOM_ERROR,
        payload: err.response.data.message || 'Something went wrong',
      });
    }
  };
};
