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
};

export default userApi;
