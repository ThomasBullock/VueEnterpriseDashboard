import Vue from "vue";
import Vuex from "vuex";
import users from "./users";
import players from "./players";
import teams from "./teams";
import api from "@/api/";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    users,
    players,
    teams,
  },
  state: {
    dashboardIsLoaded: false,
    isLoading: false,
  },
  mutations: {
    SET_DASHBOARD_IS_LOADED(state) {
      state.dashboardIsLoaded = true;
    },
    SET_IS_LOADING(state, loading) {
      state.isLoading = loading;
    },
  },
  actions: {
    fetchDashboard: ({ commit }) => {
      commit("SET_IS_LOADING", true);
      api.fetchDashboard("/dashboard").then((res) => {
        console.log(res, commit);
        commit("users/SET_USER", res.user, { root: true });
        commit("teams/SET", res.teams, { root: true });
        commit("SET_DASHBOARD_IS_LOADED");
        commit("SET_IS_LOADING", false);
      });
    },
    init: ({ commit }) => {
      const token = localStorage.getItem("access_token");
      if (token) {
        commit("users/SET_TOKEN", token, { root: true });
      }
      return;
    },
  },
});
