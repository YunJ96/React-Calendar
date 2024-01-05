import axios from 'axios';

interface TodoApi {
  createTodo: (
    email: string,
    date: string,
    todoList: string[],
    completed: boolean[]
  ) => Promise<any>;
  completeStatusUpdateTodo: (
    email: string,
    date: string,
    todoIndex: number
  ) => Promise<any>;
  deleteTodo: (email: string, date: string, todoIndex: number) => Promise<any>;
  getTodo: (email: string, date: string) => Promise<any>;
}

export interface TodoItem {
  id: number;
  text: string;
  completed: boolean;
}

const axiosInstance = axios.create({
  baseURL: `http://${process.env.REACT_APP_URL}:${process.env.REACT_APP_BE_PORT}/api/todo/`,
});

axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem('accessToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

const todoApi: TodoApi = {
  createTodo: async (email, date, todoList, completed) => {
    const url = `${date}`;
    try {
      const response = await axiosInstance.post(url, { todoList, completed });
      return response.data;
    } catch (error) {
      console.log(error);
    }
  },

  completeStatusUpdateTodo: async (email, date, todoIndex) => {
    const url = `${date}/${todoIndex}`;
    try {
      const response = await axiosInstance.patch(url);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  },

  deleteTodo: async (email, date, todoIndex) => {
    const url = `${date}/${todoIndex}`;
    try {
      const response = await axiosInstance.delete(url);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  },

  getTodo: async (email, date) => {
    const url = `${date}`;
    try {
      const response = await axiosInstance.get(url);
      console.log(response);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  },
};

export default todoApi;
