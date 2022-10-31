import { Dispatch } from 'redux';
import axios from 'axios';
import { AdminDeleteRoomActionTypes } from '../../action-types';
import { Action } from '../../action';

// this search is actually search by location
export const adminDeleteRoomAction = (roomId: string) => {
  return async (dispatch: Dispatch<Action>) => {
    dispatch({
      type: AdminDeleteRoomActionTypes.ADMIN_DELETE_ROOM_START,
    });

    try {
      let link = `/api/admin/rooms/${roomId}`;
      const { data } = await axios.delete(link);

      dispatch({
        type: AdminDeleteRoomActionTypes.ADMIN_DELETE_ROOM_SUCCESS,
        payload: data.room,
      });
    } catch (err: any) {
      dispatch({
        type: AdminDeleteRoomActionTypes.ADMIN_DELETE_ROOM_ERROR,
        payload: err.response.data.message || 'Something went wrong',
      });
    }
  };
};
