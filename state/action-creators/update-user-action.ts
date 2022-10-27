import { Dispatch } from 'redux';
import axios from 'axios';

import { UserAttrs } from '../../common-types';
import { Action } from '../action';
import { UpdateUserActionTypes } from '../action-types';

export const updateUserAction = (userData: Partial<UserAttrs>) => {
  return async (dispatch: Dispatch<Action>) => {
    dispatch({ type: UpdateUserActionTypes.UPDATE_USER_START });

    try {
      const { data } = await axios.patch('/api/auth/me/update', userData);

      dispatch({
        type: UpdateUserActionTypes.UPDATE_USER_SUCCESS,
        payload: data.message,
      });
    } catch (err: any) {
      dispatch({
        type: UpdateUserActionTypes.UPDATE_USER_ERROR,
        payload: err.response.data.message || 'Something went wrong',
      });
    }
  };
};
