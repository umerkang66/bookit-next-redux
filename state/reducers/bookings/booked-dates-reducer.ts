import { Action } from '../action';
import { BookedDatesActionTypes } from '../action-types';

interface BookedDatesState {
  loading: boolean;
  error: string | null;
  bookedDates: string[][];
}

const initialState: BookedDatesState = {
  loading: false,
  error: null,
  bookedDates: [],
};

export const bookedDatesReducer = (
  state: BookedDatesState = initialState,
  action: Action
): BookedDatesState => {
  switch (action.type) {
    case BookedDatesActionTypes.BOOKED_DATES_START:
      return {
        ...state,
        loading: true,
        error: null,
        bookedDates: [],
      };
    case BookedDatesActionTypes.BOOKED_DATES_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        bookedDates: action.payload,
      };
    case BookedDatesActionTypes.BOOKED_DATES_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
        bookedDates: [],
      };
    default:
      return state;
  }
};
