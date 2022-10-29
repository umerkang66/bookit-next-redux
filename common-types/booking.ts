export interface Booking {
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
