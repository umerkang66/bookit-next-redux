import mongoose from 'mongoose';
import validator from 'validator';
import bcrypt from 'bcryptjs';
import crypto from 'crypto';
import { UserDoc } from '../common-types/user';

// other models
import Booking from './booking';
import Room from './room';

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please enter your name'],
    maxLength: [50, 'Your name cannot exceed 50 characters'],
  },
  email: {
    type: String,
    required: [true, 'Please enter your email'],
    // this is not a validator
    unique: true,
    validate: [validator.isEmail, 'Please enter valid email'],
  },
  password: {
    type: String,
    required: [true, 'Please enter your password'],
    // this is not a validator
    minLength: [8, 'Your password cannot be below 8 characters'],
    select: false,
  },
  avatar: {
    public_id: { type: String, required: true },
    url: { type: String, required: true },
  },
  role: {
    type: String,
    required: true,
    enum: {
      values: ['user', 'admin'],
      message: 'User is either "user", or "admin"',
    },
    default: 'user',
  },
  createdAt: {
    type: Date,
  },
  resetPasswordToken: String,
  resetPasswordExpire: Date,
});

userSchema.pre('save', function (next) {
  this.createdAt = new Date();
  next();
});

userSchema.pre('save', async function (next) {
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});

userSchema.post('remove', async function (doc, next) {
  await Booking.deleteMany({ user: doc._id });
  next();
});

userSchema.methods.comparePassword = async function (
  providedPass: string
): Promise<boolean> {
  return await bcrypt.compare(providedPass, this.password);
};

// Generate password reset token
userSchema.methods.getResetPasswordToken = async function () {
  const resetToken = crypto.randomBytes(20).toString('hex');

  this.resetPasswordToken = crypto
    .createHash('sha256')
    .update(resetToken)
    .digest();

  this.resetPasswordExpire = Date.now() + 30 * 60 * 1000; // expires after 30 minutes

  return resetToken;
};

type UserModel = mongoose.Model<UserDoc>;

const User =
  (mongoose.models.User as UserModel) ||
  mongoose.model<UserDoc, UserModel>('User', userSchema);

export default User;
