import axios from 'axios';
import { Dispatch } from 'redux';
import { Action } from '../../action';
import { CheckReviewAvailabilityActionTypes } from '../../action-types';

interface CheckReviewAvailabilityReqBody {
  roomId: string;
}

export const checkReviewAvailabilityAction = (
  reqBody: CheckReviewAvailabilityReqBody
) => {
  return async (dispatch: Dispatch<Action>) => {
    dispatch({
      type: CheckReviewAvailabilityActionTypes.CHECK_REVIEW_AVAILABILITY_START,
    });

    try {
      const { data } = await axios.get(
        `/api/reviews/check-review-availability?roomId=${reqBody.roomId}`
      );

      dispatch({
        type: CheckReviewAvailabilityActionTypes.CHECK_REVIEW_AVAILABILITY_SUCCESS,
        payload: data.isReviewAvailable,
      });
    } catch (err: any) {
      dispatch({
        type: CheckReviewAvailabilityActionTypes.CHECK_REVIEW_AVAILABILITY_ERROR,
        payload: err.response.data.message || 'Something went wrong',
      });
    }
  };
};
