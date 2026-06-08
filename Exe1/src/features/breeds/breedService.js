import axios from "axios";

const API_URL = "https://dogapi.dog/api/v2/breeds";

export const getAllBreeds = async () => {
  const response = await axios.get(API_URL);

  return response.data;
};