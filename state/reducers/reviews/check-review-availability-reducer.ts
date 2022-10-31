import { Action } from '../../action';
import { CheckReviewAvailabilityActionTypes } from '../../action-types';

interface CheckReviewAvailabilityState {
  loading: boolean;
  error: string | null;
  isReviewAvailable: boolean | null;
}

const initialState: CheckReviewAvailabilityState = {
  loading: false,
  error: null,
  isReviewAvailable: null,
};

export const checkReviewAvailabilityReducer = (
  state: CheckReviewAvailabilityState = initialState,
  action: Action
): CheckReviewAvailabilityState => {
  switch (action.type) {
    case CheckReviewAvailabilityActionTypes.CHECK_REVIEW_AVAILABILITY_START:
      return {
        ...state,
        error: null,
        isReviewAvailable: null,
        loading: true,
      };
    case CheckReviewAvailabilityActionTypes.CHECK_REVIEW_AVAILABILITY_ERROR:
      return {
        ...state,
        error: action.payload,
        loading: false,
        isReviewAvailable: null,
      };
    case CheckReviewAvailabilityActionTypes.CHECK_REVIEW_AVAILABILITY_SUCCESS:
      return {
        ...state,
        error: null,
        loading: false,
        isReviewAvailable: action.payload,
      };
    default:
      return state;
  }
};
