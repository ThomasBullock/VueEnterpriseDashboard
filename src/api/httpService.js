import axios from "axios";
import {
  requestInterceptor,
  responseInterceptor,
  errorInterceptor,
} from "./persistentAuth";

const url =
  process.env.NODE_ENV === "development"
    ? "api/"
    : process.env.VUE_APP_ROOT_API;
const httpService = axios.create({
  baseURL: url,
});

httpService.interceptors.request.use(requestInterceptor);
httpService.interceptors.response.use(responseInterceptor, errorInterceptor);

export default httpService;
