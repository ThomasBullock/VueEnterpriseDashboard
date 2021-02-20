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
    allTeams: (state) => {
      return state;
    },
    teamById: (state) => (id) => {
      return state[id];
    },
    teamBySlug: (state) => (slug) => {
      return Object.values(state).find((team) => team.slug === slug);
    },
  },
};

export default teams;
