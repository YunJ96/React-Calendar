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
  logout: async () => {
    const url = `http://${process.env.REACT_APP_URL}:${process.env.REACT_APP_BE_PORT}/api/user/logout`;

    try {
      const response = await axios.get(url);
      console.log(response);
    } catch (error) {
      console.error(error);
      throw error;
    }
  },
};

export default userApi;
