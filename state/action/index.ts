import { Room } from '../../common-types/room';
import { AllRoomsActionType } from '../action-types';

interface AllRoomsSuccessAction {
  type: AllRoomsActionType.All_ROOMS_SUCCESS;
  payload: Room[];
}
interface AllRoomsErrorAction {
  type: AllRoomsActionType.All_ROOMS_ERROR;
  // this should error message
  payload: string;
}

export type Action = AllRoomsSuccessAction | AllRoomsErrorAction;
