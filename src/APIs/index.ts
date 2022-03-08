import axios from "axios";
import { baseUrl } from "../utils/constants";
import tokenStorage from "./tokenStorage";

export const axiosInstance = axios.create({ baseURL: baseUrl });

axiosInstance.interceptors.request.use((reqConfig) => {
  reqConfig.headers.authorization = tokenStorage.getToken();
  return reqConfig;
});
