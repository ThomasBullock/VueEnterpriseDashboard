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
      console.log("get");
      return api.teams.getAll().then((res) => {
        commit("SET", res);
        console.log("yep", commit);
        return res;
      });
    },
  },
  getters: {
    all: (state) => {
      return state;
    },
  },
};

export default teams;
