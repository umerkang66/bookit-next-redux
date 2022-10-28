import axios from 'axios';
import { Dispatch } from 'redux';
import { Action } from '../action';
import { ForgotPasswordActionTypes } from '../action-types';

export const forgotPassword = (email: string) => {
  return async (dispatch: Dispatch<Action>) => {
    dispatch({ type: ForgotPasswordActionTypes.FORGOT_PASSWORD_START });

    try {
      const { data } = await axios.post('/api/auth/forgot-password', { email });

      dispatch({
        type: ForgotPasswordActionTypes.FORGOT_PASSWORD_SUCCESS,
        payload: data.message,
      });
    } catch (err: any) {
      dispatch({
        type: ForgotPasswordActionTypes.FORGOT_PASSWORD_ERROR,
        payload: err.response.data.message || 'Something went wrong',
      });
    }
  };
};
