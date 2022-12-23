import type { NextPageContext } from 'next';
import { Dispatch } from 'redux';
import axios from 'axios';
import { AdminActionTypes } from '../action-types';
import { Action } from '../action';
import absoluteUrl from 'next-absolute-url';
import { RoomAttrs } from '../../common-types';

// this search is actually search by location
export const adminGetAllRoomsAction = (req: NextPageContext['req']) => {
  return async (dispatch: Dispatch<Action>) => {
    try {
      const { origin } = absoluteUrl(req);
      let link = `${origin}/api/admin/rooms`;

      const { data } = await axios.get(link, {
        headers: req?.headers,
      });

      dispatch({
        type: AdminActionTypes.ALL_ROOMS,
        payload: { rooms: data.rooms, totalRooms: data.totalRooms },
      });
    } catch (err: any) {
      throw new Error(err.response.data.message || 'Something went wrong');
    }
  };
};

// this search is actually search by location
export const adminCreateNewRoom = (roomData: any) => {
  return async (dispatch: Dispatch<Action>) => {
    try {
      let link = '/api/admin/rooms';
      const { data } = await axios.post(link, roomData);

      dispatch({ type: AdminActionTypes.NEW_ROOM, payload: data.room });
    } catch (err: any) {
      throw new Error(err.response.data.message || 'Something went wrong');
    }
  };
};

// this search is actually search by location
export const adminUpdateRoom = (roomId: string, roomData: any) => {
  return async (dispatch: Dispatch<Action>) => {
    try {
      let link = `/api/admin/rooms/${roomId}`;
      const { data } = await axios.patch(link, roomData);

      dispatch({ type: AdminActionTypes.UPDATE_ROOM, payload: data.room });
    } catch (err: any) {
      throw new Error(err.response.data.message || 'Something went wrong');
    }
  };
};

// this search is actually search by location
export const adminDeleteRoom = (roomId: string) => {
  return async (dispatch: Dispatch<Action>) => {
    try {
      let link = `/api/admin/rooms/${roomId}`;
      const { data } = await axios.delete(link);

      dispatch({ type: AdminActionTypes.DELETE_ROOM, payload: data.room });
    } catch (err: any) {
      throw new Error(err.response.data.message || 'Something went wrong');
    }
  };
};
