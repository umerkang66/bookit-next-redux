import { combineReducers } from 'redux';
import { allRoomsReducer } from './all-rooms-reducer';
import { currentuserReducer } from './currentuser-reducer';
import { forgotPasswordReducer } from './forgot-password-reducer';
import { resetPasswordReducer } from './reset-password-reducer';
import { roomReducer } from './room-reducer';
import { signupReducer } from './signup-reducer';
import { updateUserReducer } from './update-user-reducer';

export const combinedReducer = combineReducers({
  allRooms: allRoomsReducer,
  room: roomReducer,
  signup: signupReducer,
  currentuser: currentuserReducer,
  updateUser: updateUserReducer,
  forgotPassword: forgotPasswordReducer,
  resetPassword: resetPasswordReducer,
});

export type RootState = ReturnType<typeof combinedReducer>;
