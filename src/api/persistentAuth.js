import store from "../store";
import router from "../router";

const requestInterceptor = (config) => {
  if (store.getters["users/isAuthenticated"]) {
    config.headers["Authorization"] = `${store.state.users.token}`;
  }

  return config;
};

const responseInterceptor = (response) => {
  return response;
};

const errorInterceptor = (error) => {
  console.log(error.response);
  if (error.response && error.response.status === 401) {
    store.dispatch("users/logout").then(() => {
      router.push({ name: "Login" });
    });
  }
  return Promise.reject(error);
};

export { requestInterceptor, responseInterceptor, errorInterceptor };
