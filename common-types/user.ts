import mongoose from 'mongoose';

interface UserAvatar {
  public_id: string;
  url: string;
}

export interface UserAttrs {
  // when it is provided from dom, it is string, when it coming from server, it is UserAvatar
  name: string;
  email: string;
  password: string;
  avatar: UserAvatar | string;
  role?: 'user' | 'admin';
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

export interface User {
  _id: string;
  name: string;
  email: string;
  avatar: UserAvatar;
  role: 'user' | 'admin';
}

// This is the session user, that is also present in the nextApiRequest
export interface RequestUser {
  id: string;
  name: string;
  email: string;
}
