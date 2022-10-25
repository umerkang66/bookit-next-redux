import mongoose from 'mongoose';
import validator from 'validator';
import bcrypt from 'bcryptjs';
import { UserDoc } from '../common-types/user';

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

userSchema.statics.comparePassword = async (
  providedPass: string,
  userPass: string
): Promise<boolean> => {
  return await bcrypt.compare(providedPass, userPass);
};

interface UserModel extends mongoose.Model<UserDoc> {
  comparePassword(providedPass: string, userPass: string): Promise<boolean>;
}

const User =
  (mongoose.models.User as UserModel) ||
  mongoose.model<UserDoc, UserModel>('User', userSchema);

export default User;
