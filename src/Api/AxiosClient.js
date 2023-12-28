
import Axios from "axios";
import { handleApiError, handleRequest, handleResponse } from "./clientHelper";

export function axiosClient(baseURL) {
  const clientInstance = Axios.create({
    baseURL,
    headers: {
      "Content-Type": "application/json",
    },
  });
  clientInstance.interceptors.request.use(handleRequest);
  clientInstance.interceptors.response.use(handleResponse, handleApiError);
  // clientInstance.defaults.timeout === 100;
  return clientInstance;
}
