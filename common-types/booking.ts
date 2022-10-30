import { RoomImage } from './room';

export interface Booking {
  _id: string;
  room: string;
  user: string;
  checkInDate: string; // date
  checkOutDate: string; // date
  amountPaid: number;
  daysOfStay: number;
  paymentInfo: { id: string; status: string };
  paidAt: string; //date
  createdAt: string; //date
}

export interface BookingPopulated {
  _id: string;
  room: { _id: string; name: string; price: number; images: RoomImage[] };
  user: { _id: string; name: string; email: string };
  checkInDate: string; // date
  checkOutDate: string; // date
  amountPaid: number;
  daysOfStay: number;
  paymentInfo: { id: string; status: string };
  paidAt: string; //date
  createdAt: string; //date
}
