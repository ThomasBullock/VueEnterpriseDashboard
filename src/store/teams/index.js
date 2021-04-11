import api from "@/api/";

const teams = {
  namespaced: true,
  state: {},
  mutations: {
    SET(state, data) {
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
    teamIdBySlug: (state) => (slug) => {
      const team = Object.values(state).find((team) => team.slug === slug);
      return team._id;
    },
  },
};

export default teams;
