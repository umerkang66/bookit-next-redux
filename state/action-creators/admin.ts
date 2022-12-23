import type { NextPageContext } from 'next';
import { Dispatch } from 'redux';
import axios from 'axios';
import {
  AdminDeleteRoomActionTypes,
  AdminNewRoomActionTypes,
  AllAdminRoomsActionTypes,
  AdminUpdateRoomActionTypes,
} from '../action-types';
import { Action } from '../action';
import absoluteUrl from 'next-absolute-url';

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
