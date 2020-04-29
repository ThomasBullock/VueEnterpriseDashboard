import Vue from "vue";
import Vuex from "vuex";
import users from "./users";
import players from "./players";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    users,
    players,
  },
  state: {},
  mutations: {},
  actions: {},
});
