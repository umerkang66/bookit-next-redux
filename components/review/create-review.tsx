import { ChangeEvent, FormEvent, useEffect, useState } from 'react';

import { useRouter } from 'next/router';
import { toast } from 'react-toastify';
import { useActions } from '../../hooks/use-actions';
import { useTypedSelector } from '../../hooks/use-typed-selector';

const CreateReview = () => {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const router = useRouter();
  const actions = useActions();

  const createReviewState = useTypedSelector(state => state.createReview);
  const reviewAvailabilityState = useTypedSelector(
    state => state.checkReviewAvailability
  );

  const { error, loading, successMessage } = createReviewState;
  const {
    error: reviewAvailabilityError,
    loading: reviewAvailabilityLoading,
    isReviewAvailable,
  } = reviewAvailabilityState;

  const { roomId } = router.query;

  useEffect(() => {
    if (roomId) {
      actions.checkReviewAvailabilityAction({ roomId: roomId as string });
    }

    if (successMessage) toast.success(successMessage);
    if (error) toast.error(error);
  }, [successMessage, error, roomId]);

  const submitHandler = () => {
    const reviewData = { rating, comment, roomId: roomId as string };
    actions.createReviewAction(reviewData);
  };

  function setUserRatings() {
    const stars = document.querySelectorAll('.star');

    stars.forEach((star, index) => {
      // @ts-ignore
      star.starValue = index + 1;

      ['click', 'mouseover', 'mouseout'].forEach(function (e) {
        star.addEventListener(e, showRatings);
      });
    });

    function showRatings(e: any) {
      stars.forEach((star, index) => {
        if (e.type === 'click') {
          // @ts-ignore
          if (index < this.starValue) {
            star.classList.add('red');

            // @ts-ignore
            setRating(this.starValue);
          } else {
            star.classList.remove('red');
          }
        }

        if (e.type === 'mouseover') {
          // @ts-ignore
          if (index < this.starValue) {
            star.classList.add('light-red');
          } else {
            star.classList.remove('light-red');
          }
        }

        if (e.type === 'mouseout') {
          star.classList.remove('light-red');
        }
      });
    }
  }

  return (
    <div>
      {isReviewAvailable && (
        <button
          id="review_btn"
          type="button"
          className="btn btn-primary mt-4 mb-5"
          data-toggle="modal"
          data-target="#ratingModal"
          onClick={setUserRatings}
        >
          Submit Your Review
        </button>
      )}

      <div
        className="modal fade"
        id="ratingModal"
        tabIndex={-1}
        role="dialog"
        aria-labelledby="ratingModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="ratingModalLabel">
                Submit Review
              </h5>

              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <ul className="stars">
                <li className="star">
                  <i className="fa fa-star"></i>
                </li>
                <li className="star">
                  <i className="fa fa-star"></i>
                </li>
                <li className="star">
                  <i className="fa fa-star"></i>
                </li>
                <li className="star">
                  <i className="fa fa-star"></i>
                </li>
                <li className="star">
                  <i className="fa fa-star"></i>
                </li>
              </ul>

              <textarea
                name="review"
                id="review"
                className="form-control mt-3"
                value={comment}
                onChange={e => setComment(e.target.value)}
              ></textarea>

              <button
                className="btn my-3 float-right review-btn px-4 text-white"
                data-dismiss="modal"
                aria-label="Close"
                onClick={submitHandler}
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateReview;
