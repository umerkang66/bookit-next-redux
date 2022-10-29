import { Dispatch } from 'redux';
import absoluteUrl from 'next-absolute-url';
import axios from 'axios';
import { GetRoomActionType } from '../../action-types';
import { Action } from '../../action';

export const getRoom = (req: any, id: string) => {
  return async (dispatch: Dispatch<Action>) => {
    try {
      const { origin } = absoluteUrl(req);
      const { data } = await axios.get(`${origin}/api/rooms/${id}`);

      dispatch({
        type: GetRoomActionType.GET_ROOM_SUCCESS,
        payload: data.room,
      });
    } catch (err: any) {
      dispatch({
        type: GetRoomActionType.GET_ROOM_ERROR,
        payload: err.response.data.message || 'Something went wrong',
      });
    }
  };
};
