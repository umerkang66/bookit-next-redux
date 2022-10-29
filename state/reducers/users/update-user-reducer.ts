import { Action } from '../action';
import { UpdateUserActionTypes } from '../action-types';

interface UpdateUserState {
  loading: boolean;
  error: string | null;
  successMessage: string | null;
}

const initialState: UpdateUserState = {
  loading: false,
  error: null,
  successMessage: null,
};

export const updateUserReducer = (
  state: UpdateUserState = initialState,
  action: Action
): UpdateUserState => {
  switch (action.type) {
    case UpdateUserActionTypes.UPDATE_USER_START:
      return { ...state, loading: true, error: null, successMessage: null };
    case UpdateUserActionTypes.UPDATE_USER_ERROR:
      return {
        ...state,
        loading: false,
        successMessage: null,
        error: action.payload,
      };
    case UpdateUserActionTypes.UPDATE_USER_SUCCESS:
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
