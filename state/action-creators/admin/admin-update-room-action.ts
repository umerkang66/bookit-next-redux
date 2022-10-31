import { Dispatch } from 'redux';
import axios from 'axios';
import { AdminUpdateRoomActionTypes } from '../../action-types';
import { Action } from '../../action';

// this search is actually search by location
export const adminUpdateRoomAction = (roomId: string, roomData: any) => {
  return async (dispatch: Dispatch<Action>) => {
    dispatch({
      type: AdminUpdateRoomActionTypes.ADMIN_UPDATE_ROOM_START,
    });

    try {
      let link = `/api/admin/rooms/${roomId}`;
      const { data } = await axios.patch(link, roomData);

      dispatch({
        type: AdminUpdateRoomActionTypes.ADMIN_UPDATE_ROOM_SUCCESS,
        payload: data.room,
      });
    } catch (err: any) {
      dispatch({
        type: AdminUpdateRoomActionTypes.ADMIN_UPDATE_ROOM_ERROR,
        payload: err.response.data.message || 'Something went wrong',
      });
    }
  };
};
