import { Request, Response } from 'express';
import { User, IUser } from '../models';
import todoService from '../services/todoService';

const todoController = {
  createTodo: async (req: Request, res: Response) => {
    try {
      const { email } = req.user as IUser;
      const { todoList, completed } = req.body;
      const { date } = req.params;
      const createTodoList = await todoService.createTodo(
        email,
        new Date(date as string),
        todoList,
        completed
      );
      res.status(200).json(createTodoList);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  },
  completeStatusUpdateTodo: async (req: Request, res: Response) => {
    try {
      const { email } = req.user as IUser;
      const { date, todoIndex } = req.params;
      const updatedTodoList = await todoService.completeStatusUpdateTodo(
        email,
        new Date(date as string),
        Number(todoIndex)
      );
      res.status(200).json(updatedTodoList);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  },
  deleteTodo: async (req: Request, res: Response) => {
    try {
      const { email } = req.user as IUser;
      const { date, todoIndex } = req.params;
      const deletedTodoList = await todoService.deleteTodo(
        email,
        new Date(date as string),
        Number(todoIndex)
      );
      res.status(200).json(deletedTodoList);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  },
  getTodo: async (req: Request, res: Response) => {
    try {
      const { email } = req.user as IUser;
      const { date } = req.params;
      const getTodoList = await todoService.getTodo(
        email,
        new Date(date as string)
      );
      res.status(200).json(getTodoList);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  },
};

export default todoController;
