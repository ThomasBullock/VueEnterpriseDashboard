import axios from "axios";

const httpService = axios.create({
  baseURL: process.env.FIREBASE_DB,
});

export default httpService;
