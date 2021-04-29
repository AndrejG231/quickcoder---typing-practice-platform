import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:4000/graphql",
  withCredentials: true,
});

export default api;
