import axios from 'axios';
const url = `http://${process.env.REACT_APP_URL}:${process.env.REACT_APP_BE_PORT}/api/user/`;

const userApi = {
  join: async (name: string, email: string, password: string) => {
    try {
      const response = await axios.post(
        url + 'register',
        {
          name: name,
          email: email,
          password: password,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      console.log(response);
      return response;
    } catch (error) {
      console.error(error);
      throw error;
    }
  },
  login: async (email: string, password: string) => {
    try {
      const response = await axios.post(
        url + 'login',
        {
          email: email,
          password: password,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      const { accessToken, refreshToken } = response.data;

      localStorage.setItem('accessToken', accessToken);
      localStorage.setItem('refreshToken', refreshToken);
      console.log(response);
      return response;
    } catch (error) {
      console.error(error);
      throw error;
    }
  },
  update: async (name: string, email: string, password: string) => {
    const token = localStorage.getItem('accessToken');

    try {
      const response = await axios.patch(
        url + 'update',
        {
          name: name,
          email: email,
          password: password,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        }
      );

      localStorage.clear();
      localStorage.setItem('accessToken', response.data.accessToken);
      localStorage.setItem('refreshToken', response.data.refreshToken);
      console.log(response);
      return response.data.updatedUser;
    } catch (error) {
      console.log(error);
    }
  },
};

export default userApi;
