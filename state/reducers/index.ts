import { combineReducers } from 'redux';
import { allRoomsReducer } from './all-rooms-reducer';
import { currentuserReducer } from './currentuser-reducer';
import { roomReducer } from './room-reducer';
import { signupReducer } from './signup-reducer';
import { updateUserReducer } from './update-user-reducer';

export const combinedReducer = combineReducers({
  allRooms: allRoomsReducer,
  room: roomReducer,
  signup: signupReducer,
  currentuser: currentuserReducer,
  updateUser: updateUserReducer,
});

export type RootState = ReturnType<typeof combinedReducer>;
