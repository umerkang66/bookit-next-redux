import { Dispatch } from 'redux';
import absoluteUrl from 'next-absolute-url';
import axios from 'axios';
import { AllRoomsActionType } from '../action-types';
import { Action } from '../action';

export const getAllRooms = (req: any, page: number) => {
  return async (dispatch: Dispatch<Action>) => {
    try {
      const { origin } = absoluteUrl(req);
      const { data } = await axios.get(`${origin}/api/rooms?page=${page}`);

      dispatch({
        type: AllRoomsActionType.All_ROOMS_SUCCESS,
        payload: { rooms: data.rooms, totalRooms: data.totalRooms },
      });
    } catch (err: any) {
      dispatch({
        type: AllRoomsActionType.All_ROOMS_ERROR,
        payload: err.response.data.message || 'Something went wrong',
      });
    }
  };
};
