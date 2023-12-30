import { Schema, Document, Model, model } from 'mongoose';
import User, { IUser } from '../schema/user';

interface ITodo extends Document {
  email: IUser['email'];
  date: Date;
  todoList: String[];
  completed: Boolean[];
  createdAt: Date;
  updatedAt: Date;
}

const todoSchema: Schema<ITodo> = new Schema<ITodo>(
  {
    email: {
      type: String,
      ref: 'User',
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    todoList: {
      type: [String],
      required: true,
    },
    completed: {
      type: [Boolean],
      required: true,
    },
  },
  { timestamps: true }
);

const Todo: Model<ITodo> = model<ITodo>('Todo', todoSchema);

export { ITodo, Todo };
