import axios from "axios";

const url =
  process.env.NODE_ENV === "development"
    ? "api/"
    : process.env.VUE_APP_ROOT_API;
const http = axios.create({
  baseURL: url,
});

export default {
  login({ email, password }) {
    console.log(email, password);
    return http.post("login", { email, password }).then((res) => res.data);
  },
  register({ name, email, password, password2 }) {
    return http
      .post("register", { name, email, password, password2 })
      .then((res) => res.data);
  },
};
