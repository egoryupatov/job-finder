import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    "Content-Type": "application/json",
    "x-rapidapi-key": import.meta.env.VITE_API_KEY,
    "x-rapidapi-host": "jsearch.p.rapidapi.com",
  },
});
