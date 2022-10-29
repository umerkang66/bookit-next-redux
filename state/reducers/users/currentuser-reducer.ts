import { User } from '../../../common-types';
import { Action } from '../../action';
import { CurrentUserActionTypes } from '../../action-types';

interface CurrentuserState {
  loading: boolean;
  error: string | null;
  user: User | null;
}

const initialState: CurrentuserState = {
  loading: false,
  error: null,
  user: null,
};

export const currentuserReducer = (
  state: CurrentuserState = initialState,
  action: Action
): CurrentuserState => {
  switch (action.type) {
    case CurrentUserActionTypes.GET_CURRENTUSER_START:
      return { ...state, loading: true, error: null, user: null };
    case CurrentUserActionTypes.GET_CURRENTUSER_ERROR:
      return {
        ...state,
        loading: false,
        user: null,
        error: action.payload,
      };
    case CurrentUserActionTypes.GET_CURRENTUSER_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        user: action.payload,
      };
    default:
      return state;
  }
};
