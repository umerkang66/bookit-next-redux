import axios from 'axios';
import { Dispatch } from 'redux';
import { Action } from '../../action';
import { CurrentUserActionTypes } from '../../action-types';
import { NextPageContext } from 'next';
import absoluteUrl from 'next-absolute-url';

export const getCurrentUserAction = (req: NextPageContext['req']) => {
  return async (dispatch: Dispatch<Action>) => {
    dispatch({ type: CurrentUserActionTypes.GET_CURRENTUSER_START });

    try {
      const { origin } = absoluteUrl(req);
      const link = `${origin}/api/auth/me`;

      const { data } = await axios.get(link, {
        headers: req?.headers,
      });

      dispatch({
        type: CurrentUserActionTypes.GET_CURRENTUSER_SUCCESS,
        payload: data.user,
      });
    } catch (err: any) {
      dispatch({
        type: CurrentUserActionTypes.GET_CURRENTUSER_ERROR,
        payload: err.response.data.message || 'Something went wrong',
      });
    }
  };
};
