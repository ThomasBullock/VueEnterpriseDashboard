import store from "../store";

const requestInterceptor = (config) => {
  if (store.state.user.token) {
    config.headers["Authorization"] = `${store.state.user.token}`;
  }

  return config;
};

export { requestInterceptor };
