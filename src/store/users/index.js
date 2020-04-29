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
  },
  mutations: {
    SET_USER(state, user) {
      state.id = user.id;
      state.name = user.name;
      state.token = user.token;
    },
    CLEAR_USER(state) {
      state.id = null;
      state.name = null;
      state.token = null;
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
          commit("SET_USER", res);
        });
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
