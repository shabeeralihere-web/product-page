import axios from "axios";

const api = axios.create({
  baseURL: process.env.CONFIG_BACKEND_URL,
 
});

export default api;
