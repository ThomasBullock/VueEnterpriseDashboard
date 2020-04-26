import store from "../store";

const requestInterceptor = (config) => {
  if (store.state.user.isLoggedIn) {
    config.headers[
      store.state.config.jwtHeader
    ] = `${store.state.config.jwtPrefix} ${store.state.user.token}`;
  }

  return config;
};
