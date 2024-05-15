import axios from "axios";

const { VITE_SERVER_URL, LAMBDAS_BASE_URL } = import.meta.env;
console.log({ VITE_SERVER_URL });

const instance = axios.create({
  baseURL: VITE_SERVER_URL,
  withCredentials: true,
});

const lambdas = axios.create({
  baseURL: LAMBDAS_BASE_URL,
});

export { instance, lambdas };
