import Vue from "vue";
import Vuex from "vuex";
import users from "./users";
import players from "./players";
import teams from "./teams";
import ui from "./ui";
import api from "@/api/";

Vue.use(Vuex);

export default new Vuex.Store({
  // strict: process.env.NODE_ENV !== "production",
  modules: {
    users,
    players,
    teams,
    ui,
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
    fetchDashboard: ({ commit, dispatch }) => {
      commit("SET_IS_LOADING", true);
      api
        .fetchDashboard("/dashboard")
        .then((res) => {
          console.log(res, commit);
          commit("users/SET_USER", res.user, { root: true });
          commit("teams/SET", res.teams, { root: true });
          commit("SET_DASHBOARD_IS_LOADED");
          commit("SET_IS_LOADING", false);
          dispatch("ui/displaySnackbar", {
            message: "Dashboard succesfully loaded",
          });
        })
        .catch((err) => {
          console.log(err);
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
