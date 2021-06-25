import { Schema, model } from 'mongoose';

// 1. Create an interface representing a document in MongoDB.
export interface UserInterface {
  name: string;
  email: string;
  avatar?: string;
}

// 2. Create a Schema corresponding to the document interface.
export const userSchema = new Schema<UserInterface>({
  name: { type: String, required: true },
  email: { type: String, required: true },
  avatar: String,
});

// 3. Create a Model.
export const UserModel = model<UserInterface>('User', userSchema);
