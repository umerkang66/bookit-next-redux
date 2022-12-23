import { User, Room } from '../../common-types';
import { BookingPopulated } from '../../common-types/booking';
import {
  BookingsActionTypes,
  AdminActionTypes,
  AllRoomsActionType,
  CheckReviewAvailabilityActionTypes,
  CreateReviewActionTypes,
  CurrentUserActionTypes,
  GetRoomActionType,
  ResetPasswordActionTypes,
  SignupActionTypes,
  UpdateUserActionTypes,
} from '../action-types';
import { ForgotPasswordActionTypes } from '../action-types';

interface AllRoomsSuccessAction {
  type: AllRoomsActionType.All_ROOMS_SUCCESS;
  payload: { rooms: Room[]; totalRooms: number };
}
interface AllRoomsErrorAction {
  type: AllRoomsActionType.All_ROOMS_ERROR;
  // this should error message
  payload: string;
}

interface GetRoomSuccessAction {
  type: GetRoomActionType.GET_ROOM_SUCCESS;
  payload: Room;
}
interface GetRoomErrorAction {
  type: GetRoomActionType.GET_ROOM_ERROR;
  payload: string;
}

interface SignupUserStartAction {
  type: SignupActionTypes.SIGNUP_USER_START;
}
interface SignupUserSuccessAction {
  type: SignupActionTypes.SIGNUP_USER_SUCCESS;
  // this would be an success message
  payload: string;
}
interface SignupUserErrorAction {
  type: SignupActionTypes.SIGNUP_USER_ERROR;
  // this should error message
  payload: string;
}

interface GetCurrentuserStartAction {
  type: CurrentUserActionTypes.GET_CURRENTUSER_START;
}
interface GetCurrentuserSuccessAction {
  type: CurrentUserActionTypes.GET_CURRENTUSER_SUCCESS;
  payload: User;
}
interface GetCurrentuserErrorAction {
  type: CurrentUserActionTypes.GET_CURRENTUSER_ERROR;
  payload: string;
}

interface UpdateUserStartAction {
  type: UpdateUserActionTypes.UPDATE_USER_START;
}
interface UpdateUserSuccessAction {
  type: UpdateUserActionTypes.UPDATE_USER_SUCCESS;
  // this would be an success message
  payload: string;
}
interface UpdateUserErrorAction {
  type: UpdateUserActionTypes.UPDATE_USER_ERROR;
  // this should error message
  payload: string;
}

interface ForgotPasswordStartAction {
  type: ForgotPasswordActionTypes.FORGOT_PASSWORD_START;
}
interface ForgotPasswordSuccessAction {
  type: ForgotPasswordActionTypes.FORGOT_PASSWORD_SUCCESS;
  // this would be an success message
  payload: string;
}
interface ForgotPasswordErrorAction {
  type: ForgotPasswordActionTypes.FORGOT_PASSWORD_ERROR;
  // this should error message
  payload: string;
}

interface ResetPasswordStartAction {
  type: ResetPasswordActionTypes.RESET_PASSWORD_START;
}
interface ResetPasswordSuccessAction {
  type: ResetPasswordActionTypes.RESET_PASSWORD_SUCCESS;
  // this would be an success message
  payload: string;
}
interface ResetPasswordErrorAction {
  type: ResetPasswordActionTypes.RESET_PASSWORD_ERROR;
  // this should error message
  payload: string;
}

interface RoomAvailabilityAction {
  type: BookingsActionTypes.ROOM_AVAILABILITY;
  // this should tell if room is available or not
  payload: boolean;
}
interface BookedDatesAction {
  type: BookingsActionTypes.BOOKED_DATES;
  // range of dates
  payload: string[][];
}
interface GetMyBookingsAction {
  type: BookingsActionTypes.GET_MY_BOOKINGS;
  // range of dates
  payload: BookingPopulated[];
}
interface GetBookingAction {
  type: BookingsActionTypes.GET_BOOKING;
  // range of dates
  payload: BookingPopulated;
}

interface CreateReviewStartAction {
  type: CreateReviewActionTypes.CREATE_REVIEW_START;
}
interface CreateReviewSuccessAction {
  type: CreateReviewActionTypes.CREATE_REVIEW_SUCCESS;
  // this should be success message
  payload: string;
}
interface CreateReviewErrorAction {
  type: CreateReviewActionTypes.CREATE_REVIEW_ERROR;
  // this should be error message
  payload: string;
}

interface CheckReviewAvailabilityStartAction {
  type: CheckReviewAvailabilityActionTypes.CHECK_REVIEW_AVAILABILITY_START;
}
interface CheckReviewAvailabilitySuccessAction {
  type: CheckReviewAvailabilityActionTypes.CHECK_REVIEW_AVAILABILITY_SUCCESS;
  payload: boolean;
}
interface CheckReviewAvailabilityErrorAction {
  type: CheckReviewAvailabilityActionTypes.CHECK_REVIEW_AVAILABILITY_ERROR;
  // this should be error message
  payload: string;
}

interface AllAdminRoomsAction {
  type: AdminActionTypes.ALL_ROOMS;
  payload: { rooms: Room[]; totalRooms: number };
}
interface AdminNewRoomAction {
  type: AdminActionTypes.NEW_ROOM;
  payload: Room;
}
interface AdminUpdateRoomAction {
  type: AdminActionTypes.UPDATE_ROOM;
  payload: Room;
}
interface AdminDeleteRoomAction {
  type: AdminActionTypes.DELETE_ROOM;
  payload: null;
}

export type Action =
  | AllAdminRoomsAction
  | AdminNewRoomAction
  | AdminUpdateRoomAction
  | AdminDeleteRoomAction
  | CheckReviewAvailabilityStartAction
  | CheckReviewAvailabilitySuccessAction
  | CheckReviewAvailabilityErrorAction
  | CreateReviewStartAction
  | CreateReviewSuccessAction
  | CreateReviewErrorAction
  | AllRoomsSuccessAction
  | AllRoomsErrorAction
  | GetRoomSuccessAction
  | GetRoomErrorAction
  | SignupUserStartAction
  | SignupUserSuccessAction
  | SignupUserErrorAction
  | GetCurrentuserStartAction
  | GetCurrentuserSuccessAction
  | GetCurrentuserErrorAction
  | UpdateUserStartAction
  | UpdateUserSuccessAction
  | UpdateUserErrorAction
  | ForgotPasswordStartAction
  | ForgotPasswordSuccessAction
  | ForgotPasswordErrorAction
  | ResetPasswordStartAction
  | ResetPasswordSuccessAction
  | ResetPasswordErrorAction
  | RoomAvailabilityAction
  | BookedDatesAction
  | GetMyBookingsAction
  | GetBookingAction;
