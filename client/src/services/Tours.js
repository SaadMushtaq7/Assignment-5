import axios from "axios";

export const fetchTours = async () => {
  const res = await axios
    .get("http://localhost:3001/getTours")
    .then(async (response) => {
      return response.data;
    })
    .catch((error) => {
      console.log(error);
    });
  return res;
};
