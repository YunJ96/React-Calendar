import axios from 'axios';

const weatherApi = async () => {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=Seoul&appid=${process.env.REACT_APP_WEATHER_API_KEY}`;
  try {
    const response = await axios.get(url);
    console.log(response);
    return [
      Math.round(((response.data.main.temp - 273.15) * 10) / 10),
      response.data.weather[0].description,
    ];
  } catch (error) {
    console.log(error);
  }
};

export default weatherApi;
