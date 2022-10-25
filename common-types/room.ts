import mongoose from 'mongoose';
import { User } from './user';

interface RoomImage {
  public_id: string;
  url: string;
}

interface RoomReview {
  user: User;
  name: string;
  rating: number;
  comment: string;
}

export interface RoomAttrs {
  name: string;
  user: User;
  price: number;
  description: string;
  address: string;
  guestCapacity: number;
  numOfBeds: number;
  internet?: boolean;
  breakfast?: boolean;
  airConditioned?: boolean;
  petsAllowed?: boolean;
  roomCleaning?: boolean;
  ratings?: number;
  numOfReviews?: number;
  images: RoomImage[];
  category: 'King' | 'Single' | 'Twins';
  reviews: RoomReview[];
}

export interface RoomDoc extends mongoose.Document {
  name: string;
  user: User;
  price: number;
  description: string;
  address: string;
  guestCapacity: number;
  numOfBeds: number;
  internet: boolean;
  breakfast: boolean;
  airConditioned: boolean;
  petsAllowed: boolean;
  roomCleaning: boolean;
  ratings: number;
  numOfReviews: number;
  images: RoomImage[];
  category: 'King' | 'Single' | 'Twins';
  reviews: RoomReview[];
  createdAt: Date;
}

export interface Room {
  _id: string;
  name: string;
  user: User;
  price: number;
  description: string;
  address: string;
  guestCapacity: number;
  numOfBeds: number;
  internet: boolean;
  breakfast: boolean;
  airConditioned: boolean;
  petsAllowed: boolean;
  roomCleaning: boolean;
  ratings: number;
  numOfReviews: number;
  images: RoomImage[];
  category: 'King' | 'Single' | 'Twins';
  reviews: RoomReview[];
  createdAt: Date;
}