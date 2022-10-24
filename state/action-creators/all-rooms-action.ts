import { Dispatch } from 'redux';
import absoluteUrl from 'next-absolute-url';
import axios from 'axios';
import { AllRoomsActionType } from '../action-types';
import { Action } from '../action';

// this search is actually search by location
export const getAllRooms = (
  req: any,
  page: number,
  search: string,
  guestCapacity: string,
  category: string
) => {
  return async (dispatch: Dispatch<Action>) => {
    try {
      const { origin } = absoluteUrl(req);
      let link = `${origin}/api/rooms?page=${page}&search=${search}`;

      if (guestCapacity) link += `&guestCapacity=${guestCapacity}`;
      if (category) link += `&category=${category}`;

      const { data } = await axios.get(link);

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
