import axios from 'axios';

interface WeatherApiResponse {
  main: {
    temp: number;
  };
  weather: {
    description: string;
  }[];
}

const weatherApi = async (): Promise<[number, string]> => {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=Seoul&appid=${process.env.REACT_APP_WEATHER_API_KEY}`;
  try {
    const response = await axios.get<WeatherApiResponse>(url);
    console.log(response);
    return [
      Math.round(((response.data.main.temp - 273.15) * 10) / 10),
      response.data.weather[0].description,
    ];
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export default weatherApi;
