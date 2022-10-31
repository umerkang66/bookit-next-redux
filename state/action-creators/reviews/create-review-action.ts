import axios from 'axios';
import { Dispatch } from 'redux';
import { Action } from '../../action';
import { CreateReviewActionTypes } from '../../action-types';

interface CreateReviewReqBody {
  roomId: string;
  rating: number;
  comment: string;
}

export const createReviewAction = (reqBody: CreateReviewReqBody) => {
  return async (dispatch: Dispatch<Action>) => {
    dispatch({
      type: CreateReviewActionTypes.CREATE_REVIEW_START,
    });

    try {
      const { data } = await axios.post('/api/reviews', reqBody);

      dispatch({
        type: CreateReviewActionTypes.CREATE_REVIEW_SUCCESS,
        payload: data.message,
      });
    } catch (err: any) {
      dispatch({
        type: CreateReviewActionTypes.CREATE_REVIEW_ERROR,
        payload: err.response.data.message || 'Something went wrong',
      });
    }
  };
};
