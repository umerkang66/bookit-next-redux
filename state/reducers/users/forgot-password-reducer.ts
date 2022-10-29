import { Action } from '../action';
import { ForgotPasswordActionTypes } from '../action-types';

interface ForgotPasswordState {
  loading: boolean;
  error: string | null;
  successMessage: string | null;
}

const initialState: ForgotPasswordState = {
  loading: false,
  error: null,
  successMessage: null,
};

export const forgotPasswordReducer = (
  state: ForgotPasswordState = initialState,
  action: Action
): ForgotPasswordState => {
  switch (action.type) {
    case ForgotPasswordActionTypes.FORGOT_PASSWORD_START:
      return { ...state, loading: true, error: null, successMessage: null };
    case ForgotPasswordActionTypes.FORGOT_PASSWORD_ERROR:
      return {
        ...state,
        loading: false,
        successMessage: null,
        error: action.payload,
      };
    case ForgotPasswordActionTypes.FORGOT_PASSWORD_SUCCESS:
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
