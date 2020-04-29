import api from "@/api/";

console.log(api);

const players = {
  namespaced: true,
  state: {},
  mutations: {},
  actions: {
    getAll: ({ commit }) => {
      console.log("yep", commit);
    },
  },
  getters: {},
};

export default players;
