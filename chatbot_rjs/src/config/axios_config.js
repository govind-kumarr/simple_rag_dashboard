import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:3030",
  withCredentials: true,
});

export { instance };
