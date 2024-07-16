import axios from "axios";

const axiosIns = axios.create({
  baseURL: "https://backend-animeku-by-jikan.vercel.app/api",
  withCredentials: true,
});

export default axiosIns;
