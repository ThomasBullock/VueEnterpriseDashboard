import store from "../store";

const requestInterceptor = (config) => {
  if (store.getters["users/isAuthenticated"]) {
    config.headers["Authorization"] = `${store.state.users.token}`;
  }

  return config;
};

export { requestInterceptor };
