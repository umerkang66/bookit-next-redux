import { User, Room } from '../../common-types';
import { BookingPopulated } from '../../common-types/booking';
import {
  AdminActionTypes,
  AllRoomsActionType,
  BookedDatesActionTypes,
  CheckBookingResetActionTypes,
  CheckReviewAvailabilityActionTypes,
  CheckRoomAvailabilityActionTypes,
  CreateReviewActionTypes,
  CurrentUserActionTypes,
  GetBookingActionTypes,
  GetMyBookingsActionTypes,
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

interface CheckRoomAvailabilityStartAction {
  type: CheckRoomAvailabilityActionTypes.CHECK_ROOM_AVAILABILITY_START;
}
interface CheckRoomAvailabilitySuccessAction {
  type: CheckRoomAvailabilityActionTypes.CHECK_ROOM_AVAILABILITY_SUCCESS;
  // this should tell if room is available or not
  payload: boolean;
}
interface CheckRoomAvailabilityResetAction {
  type: CheckRoomAvailabilityActionTypes.CHECK_ROOM_AVAILABILITY_RESET;
}
interface CheckRoomAvailabilityErrorAction {
  type: CheckRoomAvailabilityActionTypes.CHECK_ROOM_AVAILABILITY_ERROR;
  // this should be error message
  payload: string;
}

interface BookedDatesStartAction {
  type: BookedDatesActionTypes.BOOKED_DATES_START;
}
interface BookedDatesSuccessAction {
  type: BookedDatesActionTypes.BOOKED_DATES_SUCCESS;
  // range of dates
  payload: string[][];
}
interface BookedDatesErrorAction {
  type: BookedDatesActionTypes.BOOKED_DATES_ERROR;
  // this should be error message
  payload: string;
}

interface GetMyBookingsStartAction {
  type: GetMyBookingsActionTypes.GET_MY_BOOKINGS_START;
}
interface GetMyBookingsSuccessAction {
  type: GetMyBookingsActionTypes.GET_MY_BOOKINGS_SUCCESS;
  // range of dates
  payload: BookingPopulated[];
}
interface GetMyBookingsErrorAction {
  type: GetMyBookingsActionTypes.GET_MY_BOOKINGS_ERROR;
  // this should be error message
  payload: string;
}

interface GetBookingSuccessAction {
  type: GetBookingActionTypes.GET_BOOKING_SUCCESS;
  // range of dates
  payload: BookingPopulated;
}
interface GetBookingErrorAction {
  type: GetBookingActionTypes.GET_BOOKING_ERROR;
  // this should be error message
  payload: string;
}

interface CheckBookingResetAction {
  type: CheckBookingResetActionTypes.CHECK_BOOKING_RESET;
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
  | CheckRoomAvailabilityStartAction
  | CheckRoomAvailabilitySuccessAction
  | CheckRoomAvailabilityResetAction
  | CheckRoomAvailabilityErrorAction
  | BookedDatesStartAction
  | BookedDatesSuccessAction
  | BookedDatesErrorAction
  | GetMyBookingsStartAction
  | GetMyBookingsSuccessAction
  | GetMyBookingsErrorAction
  | GetBookingSuccessAction
  | GetBookingErrorAction
  | CheckBookingResetAction;
