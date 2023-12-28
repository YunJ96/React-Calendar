import axios from 'axios';

const userApi = {
  join: async (name: string, email: string, password: string) => {
    const url = `http://${process.env.REACT_APP_URL}:${process.env.REACT_APP_BE_PORT}/api/user/register`;

    try {
      const response = await axios.post(
        url,
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
    const url = `http://${process.env.REACT_APP_URL}:${process.env.REACT_APP_BE_PORT}/api/user/login`;

    try {
      const response = await axios.post(
        url,
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
    const url = `http://${process.env.REACT_APP_URL}:${process.env.REACT_APP_BE_PORT}/api/user/update`;
    const token = localStorage.getItem('accessToken');

    try {
      const response = await axios.patch(
        url,
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
