import { Action } from '../action';
import { SignupActionTypes } from '../action-types';

interface UserState {
  loading: boolean;
  error: string | null;
  successMessage: string | null;
}

const initialState: UserState = {
  loading: false,
  error: null,
  successMessage: null,
};

export const signupReducer = (
  state: UserState = initialState,
  action: Action
): UserState => {
  switch (action.type) {
    case SignupActionTypes.SIGNUP_USER_START:
      return { ...state, loading: true, error: null, successMessage: null };
    case SignupActionTypes.SIGNUP_USER_ERROR:
      return {
        ...state,
        loading: false,
        successMessage: null,
        error: action.payload,
      };
    case SignupActionTypes.SIGNUP_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        successMessage: action.payload,
      };
    default:
      return state;
  }
};
