import { combineReducers } from 'redux';
import { allRoomsReducer } from './all-rooms-reducer';
import { roomReducer } from './room-reducer';

export const combinedReducer = combineReducers({
  allRooms: allRoomsReducer,
  room: roomReducer,
});

export type RootState = ReturnType<typeof combinedReducer>;
