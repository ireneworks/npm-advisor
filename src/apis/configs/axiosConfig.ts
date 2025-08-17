import axios from "axios";

export const npmRequester = axios.create({
  baseURL: "https://registry.npmjs.org",
  timeout: 3000,
});

npmRequester.interceptors.response.use(
  (response) => response,
  (error) => {
    return Promise.reject(error);
  },
);
