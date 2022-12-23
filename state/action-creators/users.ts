import type { NextPageContext } from 'next';
import absoluteUrl from 'next-absolute-url';
import axios from 'axios';
import { Dispatch } from 'redux';
import { Action } from '../action';
import {
  CurrentUserActionTypes,
  ForgotPasswordActionTypes,
  ResetPasswordActionTypes,
  SignupActionTypes,
  UpdateUserActionTypes,
} from '../action-types';
import { UserAttrs } from '../../common-types';

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

export const registerUser = (userData: UserAttrs) => {
  return async (dispatch: Dispatch<Action>) => {
    dispatch({ type: SignupActionTypes.SIGNUP_USER_START });

    try {
      const { data } = await axios.post('/api/auth/signup', userData);

      dispatch({
        type: SignupActionTypes.SIGNUP_USER_SUCCESS,
        payload: data.message,
      });
    } catch (err: any) {
      dispatch({
        type: SignupActionTypes.SIGNUP_USER_ERROR,
        payload: err.response.data.message || 'Something went wrong',
      });
    }
  };
};

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
