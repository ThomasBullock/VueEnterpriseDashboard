import api from "@/api/";

const teams = {
  namespaced: true,
  state: {},
  mutations: {
    SET(state, data) {
      console.log(data);
      data.forEach((item) => {
        state[item._id] = item;
      });
    },
  },
  actions: {
    getAll: ({ commit }) => {
      return api.teams.getAll().then((res) => {
        commit("SET", res);
        return res;
      });
    },
  },
  getters: {
    all: (state) => {
      return state;
    },
    teamById: (state) => (id) => {
      return state[id];
    },
  },
};

export default teams;
