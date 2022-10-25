import axios from 'axios';
import { Dispatch } from 'redux';
import { UserAttrs } from '../../common-types';
import { Action } from '../action';
import { SignupActionTypes } from '../action-types';

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
