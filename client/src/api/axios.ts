import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000", // your NestJS server
  withCredentials: true, // important for cookies
});

export default api;
