import axios from "axios";

const { VITE_SERVER_URL } = import.meta.env;
console.log({ VITE_SERVER_URL });

const instance = axios.create({
  baseURL: VITE_SERVER_URL,
  withCredentials: true,
});

const lambdas = axios.create({
  baseURL: "https://nr3wrniofl.execute-api.ap-south-1.amazonaws.com",
});

export { instance, lambdas };
