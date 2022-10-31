import { Dispatch } from 'redux';
import absoluteUrl from 'next-absolute-url';
import axios from 'axios';
import { AllAdminRoomsActionTypes } from '../../action-types';
import { Action } from '../../action';
import { NextPageContext } from 'next';

// this search is actually search by location
export const getAdminAllRoomsAction = (req: NextPageContext['req']) => {
  return async (dispatch: Dispatch<Action>) => {
    try {
      const { origin } = absoluteUrl(req);
      let link = `${origin}/api/admin/rooms`;

      const { data } = await axios.get(link, {
        headers: req?.headers,
      });

      dispatch({
        type: AllAdminRoomsActionTypes.All_ADMIN_ROOMS_SUCCESS,
        payload: { rooms: data.rooms, totalRooms: data.totalRooms },
      });
    } catch (err: any) {
      dispatch({
        type: AllAdminRoomsActionTypes.All_ADMIN_ROOMS_ERROR,
        payload: err.response.data.message || 'Something went wrong',
      });
    }
  };
};
