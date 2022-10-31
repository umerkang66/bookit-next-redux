import { combineReducers } from 'redux';
import { allRoomsReducer } from './rooms/all-rooms-reducer';
import { roomReducer } from './rooms/room-reducer';
import { bookedDatesReducer } from './bookings/booked-dates-reducer';
import { checkRoomAvailabilityReducer } from './bookings/check-room-availability-reducer';
import { currentuserReducer } from './users/currentuser-reducer';
import { forgotPasswordReducer } from './users/forgot-password-reducer';
import { resetPasswordReducer } from './users/reset-password-reducer';
import { signupReducer } from './users/signup-reducer';
import { updateUserReducer } from './users/update-user-reducer';
import { myBookingsReducer } from './bookings/my-bookings-reducer';
import { bookingReducer } from './bookings/booking-reducer';
import { createReviewReducer } from './reviews/create-review-reducer';
import { checkReviewAvailabilityReducer } from './reviews/check-review-availability-reducer';
import { allAdminRoomsReducer } from './admin/all-admin-rooms-reducer';

export const combinedReducer = combineReducers({
  allRooms: allRoomsReducer,
  room: roomReducer,
  signup: signupReducer,
  currentuser: currentuserReducer,
  updateUser: updateUserReducer,
  forgotPassword: forgotPasswordReducer,
  resetPassword: resetPasswordReducer,
  checkRoomAvailability: checkRoomAvailabilityReducer,
  bookedDates: bookedDatesReducer,
  myBookings: myBookingsReducer,
  booking: bookingReducer,
  createReview: createReviewReducer,
  checkReviewAvailability: checkReviewAvailabilityReducer,
  allAdminRooms: allAdminRoomsReducer,
});

export type RootState = ReturnType<typeof combinedReducer>;
