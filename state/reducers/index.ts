import { combineReducers } from 'redux';
import { allRoomsReducer } from './all-rooms-reducer';
import { roomReducer } from './room-reducer';
import { signupReducer } from './signup-reducer';

export const combinedReducer = combineReducers({
  allRooms: allRoomsReducer,
  room: roomReducer,
  signup: signupReducer,
});

export type RootState = ReturnType<typeof combinedReducer>;
