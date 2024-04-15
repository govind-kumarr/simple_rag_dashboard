import axios from "axios";

const { VITE_SERVER_URL } = import.meta.env;

const instance = axios.create({
  baseURL: VITE_SERVER_URL,
  withCredentials: true,
});

export { instance };
