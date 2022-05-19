import axios from "axios";

const API = {
  key: `62c645e31a2dfb4c3146cbff3bf86345`,
  base: `https://api.openweathermap.org/data/2.5/`,
};

export const fetchWeather = async (city:string) => {
  const res = await axios
    .get(`${API.base}forecast?q=${city}&appid=${API.key}`)
    .then(async (response) => {
      return response.data;
    })
    .catch((error) => {
      console.log(error);
    });
  return res;
};
