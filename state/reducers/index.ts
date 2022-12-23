import { combineReducers } from 'redux';
import { allRoomsReducer } from './rooms/all-rooms-reducer';
import { roomReducer } from './rooms/room-reducer';

import { currentuserReducer } from './users/currentuser-reducer';
import { forgotPasswordReducer } from './users/forgot-password-reducer';
import { resetPasswordReducer } from './users/reset-password-reducer';
import { signupReducer } from './users/signup-reducer';
import { updateUserReducer } from './users/update-user-reducer';

import { createReviewReducer } from './reviews/create-review-reducer';
import { checkReviewAvailabilityReducer } from './reviews/check-review-availability-reducer';
import { adminReducer } from './admin';
import { bookingsReducer } from './bookings';

export const combinedReducer = combineReducers({
  allRooms: allRoomsReducer,
  room: roomReducer,
  signup: signupReducer,
  currentuser: currentuserReducer,
  updateUser: updateUserReducer,
  forgotPassword: forgotPasswordReducer,
  resetPassword: resetPasswordReducer,
  createReview: createReviewReducer,
  checkReviewAvailability: checkReviewAvailabilityReducer,
  admin: adminReducer,
  bookings: bookingsReducer,
});

export type RootState = ReturnType<typeof combinedReducer>;
