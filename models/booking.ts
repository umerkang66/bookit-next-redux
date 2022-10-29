import mongoose from 'mongoose';

const bookingSchema = new mongoose.Schema({
  room: {
    type: mongoose.Types.ObjectId,
    ref: 'Room',
    required: true,
  },
  user: {
    type: mongoose.Types.ObjectId,
    ref: 'user',
    required: true,
  },
  checkInDate: { type: Date, required: true },
  checkOutDate: { type: Date, required: true },
  amountPaid: { type: Number, required: true },
  daysOfStay: { type: Number, required: true },
  paymentInfo: {
    id: { type: String, required: true },
    status: { type: String, required: true },
  },
  paidAt: { type: Date, required: true },
  createdAt: { type: Date },
});

bookingSchema.pre('save', function (next) {
  this.createdAt = new Date();
  next();
});

const Booking =
  mongoose.models.Booking || mongoose.model('Booking', bookingSchema);

export default Booking;
