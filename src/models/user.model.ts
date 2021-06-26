import { Schema, model } from 'mongoose';
import { IUser } from '@src/interfaces/user.interface';

export const userSchema = new Schema<IUser>(
  {
    name: {
      type: String,
      required: 'name is required',
      minlength: 6,
      maxlength: 20,
    },
    email: {
      type: String,
      unique: true,
      required: 'email is required',
      minlength: 6,
      maxlength: 255,
    },
    password: {
      type: String,
      required: 'Please enter valid password to continue!',
      minlength: 6,
    },
  },
  {
    timestamps: true,
  }
);

export const User = model<IUser>('User', userSchema);
