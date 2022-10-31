import { Room } from '../../../common-types/room';
import { Action } from '../../action';
import { CreateReviewActionTypes } from '../../action-types';

interface CreateReviewState {
  loading: boolean;
  error: string | null;
  successMessage: string | null;
}

const initialState: CreateReviewState = {
  loading: false,
  error: null,
  successMessage: null,
};

export const createReviewReducer = (
  state: CreateReviewState = initialState,
  action: Action
): CreateReviewState => {
  switch (action.type) {
    case CreateReviewActionTypes.CREATE_REVIEW_START:
      return {
        ...state,
        error: null,
        successMessage: null,
        loading: true,
      };
    case CreateReviewActionTypes.CREATE_REVIEW_ERROR:
      return {
        ...state,
        error: action.payload,
        loading: false,
        successMessage: null,
      };
    case CreateReviewActionTypes.CREATE_REVIEW_SUCCESS:
      return {
        ...state,
        error: null,
        loading: false,
        successMessage: action.payload,
      };
    default:
      return state;
  }
};
