import { Schema, Document, model } from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

export interface IUser extends Document {
  shortId: string;
  name: string;
  email: string;
  password: string;
  profileImage: string;
  refreshToken: string;
  isTempPassword: boolean;
  isAdmin: boolean;
}

const userSchema: Schema<IUser> = new Schema<IUser>({
  shortId: {
    type: String,
    unique: true,
  },
  name: {
    type: String,
    maxlength: 10,
    required: true,
  },
  email: {
    type: String,
    trim: true,
    unique: 1,
    required: true,
  },
  password: {
    type: String,
    minlength: 10,
    required: true,
  },
  profileImage: {
    String,
  },
  refreshToken: {
    type: String,
    default: '',
  },
  isTempPassword: {
    type: Boolean,
    default: false,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
});

export default model<IUser>('User', userSchema);
