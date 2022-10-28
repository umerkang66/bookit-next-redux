import { Action } from '../action';
import { ResetPasswordActionTypes } from '../action-types';

interface ResetPasswordState {
  loading: boolean;
  error: string | null;
  successMessage: string | null;
}

const initialState: ResetPasswordState = {
  loading: false,
  error: null,
  successMessage: null,
};

export const resetPasswordReducer = (
  state: ResetPasswordState = initialState,
  action: Action
): ResetPasswordState => {
  switch (action.type) {
    case ResetPasswordActionTypes.RESET_PASSWORD_START:
      return { ...state, loading: true, error: null, successMessage: null };
    case ResetPasswordActionTypes.RESET_PASSWORD_ERROR:
      return {
        ...state,
        loading: false,
        successMessage: null,
        error: action.payload,
      };
    case ResetPasswordActionTypes.RESET_PASSWORD_SUCCESS:
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
