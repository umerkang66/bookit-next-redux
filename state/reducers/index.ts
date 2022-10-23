import { combineReducers } from 'redux';
import { allRoomsReducer } from './all-rooms-reducer';

export const combinedReducer = combineReducers({
  allRooms: allRoomsReducer,
});

export type RootState = ReturnType<typeof combinedReducer>;
