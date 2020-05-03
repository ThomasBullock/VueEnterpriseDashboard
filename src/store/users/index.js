import authApi from "@/api/auth";

const users = {
  namespaced: true,
  state: {
    id: null,
    name: null,
    token: null,
  },
  getters: {
    isAuthenticated(state) {
      return state.token != null;
    },
    userData(state) {
      return {
        name: state.name,
      };
    },
  },
  mutations: {
    SET_TOKEN(state, token) {
      localStorage.setItem("access_token", token);
      state.token = token;
    },
    CLEAR_TOKEN(state) {
      localStorage.removeItem("access_token");
      state.token = null;
    },
    SET_USER(state, user) {
      console.log("SET_USER", user);
      state.id = user.id;
      state.name = user.name;
    },
    CLEAR_USER(state) {
      state.id = null;
      state.name = null;
    },
  },
  actions: {
    login: ({ commit }, userDetails) => {
      console.log(commit, userDetails);
      return authApi
        .login({
          ...userDetails,
        })
        .then((res) => {
          console.log(res);
          commit("SET_TOKEN", res.token);
          commit("SET_USER", res);
          return res;
        });
    },
    logout: ({ commit }) => {
      console.log("logout");
      commit("CLEAR_TOKEN");
      commit("CLEAR_USER");
      return;
    },
    register: ({ commit }, userDetails) => {
      return authApi
        .register({
          ...userDetails,
        })
        .then((res) => {
          console.log(res);
          commit("SET_USER", res);
        });
    },
  },
};

export default users;
