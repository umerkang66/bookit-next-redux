import axios from 'axios';
import { Dispatch } from 'redux';
import { Action } from '../../action';
import { ResetPasswordActionTypes } from '../../action-types';

export const resetPassword = (
  token: string,
  password: string,
  passwordConfirm: string
) => {
  return async (dispatch: Dispatch<Action>) => {
    dispatch({ type: ResetPasswordActionTypes.RESET_PASSWORD_START });

    try {
      const { data } = await axios.post(`/api/auth/reset-password/${token}`, {
        password,
        passwordConfirm,
      });

      dispatch({
        type: ResetPasswordActionTypes.RESET_PASSWORD_SUCCESS,
        payload: data.message,
      });
    } catch (err: any) {
      dispatch({
        type: ResetPasswordActionTypes.RESET_PASSWORD_ERROR,
        payload: err.response.data.message || 'Something went wrong',
      });
    }
  };
};
