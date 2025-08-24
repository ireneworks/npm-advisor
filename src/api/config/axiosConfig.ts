import axios, { AxiosInstance } from "axios";

export function createRequester(baseURL: string): AxiosInstance {
  const instance = axios.create({
    baseURL,
    timeout: 60000,
  });

  instance.interceptors.response.use(
    (response) => response,
    (error) => {
      console.error(`[API ERROR] ${baseURL}`, error);
      return Promise.reject(error);
    },
  );

  return instance;
}
