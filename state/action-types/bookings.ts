export enum BookedDatesActionTypes {
  BOOKED_DATES_START = 'booked_dates_start',
  BOOKED_DATES_SUCCESS = 'booked_dates_success',
  BOOKED_DATES_ERROR = 'booked_dates_error',
}

export enum CheckBookingResetActionTypes {
  CHECK_BOOKING_RESET = 'check_booking_reset',
}

export enum CheckRoomAvailabilityActionTypes {
  CHECK_ROOM_AVAILABILITY_START = 'check_room_availability_start',
  CHECK_ROOM_AVAILABILITY_SUCCESS = 'check_room_availability_success',
  CHECK_ROOM_AVAILABILITY_RESET = 'check_room_availability_reset',
  CHECK_ROOM_AVAILABILITY_ERROR = 'check_room_availability_error',
}

export enum GetBookingActionTypes {
  GET_BOOKING_SUCCESS = 'get_booking_success',
  GET_BOOKING_ERROR = 'get_booking_error',
}

export enum GetMyBookingsActionTypes {
  GET_MY_BOOKINGS_START = 'get_my_bookings_start',
  GET_MY_BOOKINGS_SUCCESS = 'get_my_bookings_success',
  GET_MY_BOOKINGS_ERROR = 'get_my_bookings_error',
}
