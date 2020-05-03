import axios from "axios";
import { requestInterceptor } from "./persistentAuth";

const url =
  process.env.NODE_ENV === "development"
    ? "api/"
    : process.env.VUE_APP_ROOT_API;
const httpService = axios.create({
  baseURL: url,
});

httpService.interceptors.request.use(requestInterceptor);

export default httpService;
