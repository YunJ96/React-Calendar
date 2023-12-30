import axios from 'axios';

const todoApi = {
  createTodo: async (email: string, date: string, todoList: string[]) => {
    try {
      const url = `http://${process.env.REACT_APP_URL}:${process.env.REACT_APP_BE_PORT}/api/todo/${date}`;

      const response = await axios.post(
        url,
        {
          email,
          todoList,
          completed: false,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
          },
        }
      );

      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  },

  completeStatusUpdateTodo: async (
    email: string,
    date: string,
    todoIndex: number
  ) => {
    try {
      const url = `http://${process.env.REACT_APP_URL}:${process.env.REACT_APP_BE_PORT}/api/todo/${date}/${todoIndex}`;

      const response = await axios.put(url, null, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        },
      });

      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  },

  deleteTodo: async (email: string, date: string, todoIndex: number) => {
    try {
      const url = `http://${process.env.REACT_APP_URL}:${process.env.REACT_APP_BE_PORT}/api/todo/${date}/${todoIndex}`;

      const response = await axios.delete(url, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        },
      });

      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  },

  getTodo: async (email: string, date: string) => {
    try {
      const url = `http://${process.env.REACT_APP_URL}:${process.env.REACT_APP_BE_PORT}/api/todo/${date}`;

      const response = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        },
      });

      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  },
};

export default todoApi;
