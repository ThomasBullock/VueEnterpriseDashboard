import axios from "axios";
import { requestInterceptor } from "./persistentAuth";

const httpService = axios.create({
  baseURL: process.env.VUE_APP_ROOT_API,
});

httpService.interceptors.request.use(requestInterceptor);

export default httpService;
