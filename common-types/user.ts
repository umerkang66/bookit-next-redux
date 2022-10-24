import mongoose from 'mongoose';

interface UserAvatar {
  public_id: string;
  url: string;
}

export interface RoomAttrs {
  name: string;
  email: string;
  password: string;
  avatar: UserAvatar;
  role: 'user' | 'admin';
}

export interface UserDoc extends mongoose.Document {
  name: string;
  email: string;
  password: string;
  avatar: UserAvatar;
  role: 'user' | 'admin';
  createdAt: Date;
  resetPasswordToken?: string;
  resetPasswordExpire?: Date;
}

export interface Room {
  _id: string;
  name: string;
  email: string;
  password: string;
  avatar: UserAvatar;
  role: 'user' | 'admin';
  createdAt: Date;
}
