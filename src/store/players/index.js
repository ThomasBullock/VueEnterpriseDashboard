import api from "@/api/";
import cloudinary from "@/api/cloudinary";
import Vue from "vue";

const players = {
  namespaced: true,
  state: {
    items: {},
    isMakingRequest: false,
    isLoaded: false,
  },
  mutations: {
    SET(state, data) {
      data.forEach((item) => {
        Vue.set(state.items, item._id, item);
      });
    },
    DELETE(state, id) {
      Vue.delete(state.items, id);
    },
    SET_IS_LOADED(state, payload) {
      state.isLoaded = payload;
    },
  },
  actions: {
    getAll: ({ commit }) => {
      return api.players.getAll().then((res) => {
        commit("SET", res);
        commit("SET_IS_LOADED", true);
        return res;
      });
    },
    uploadImage: ({ dispatch }, player) => {
      console.log("upload Image");
      const photoForm = new FormData();
      photoForm.append("file", player.img);
      photoForm.append("api_key", process.env.VUE_APP_CLOUDINARY_KEY);
      photoForm.append("upload_preset", process.env.VUE_APP_CLOUDINARY_PRESET);
      photoForm.append("timestamp", (Date.now() / 1000) | 0);

      console.log(photoForm);

      return cloudinary.upload(photoForm).then((res) => {
        console.log(res);
        player.imgUrl = res.url;
        player.imgPublicId = res.public_id;
        if (player._id) {
          dispatch("updateOne", player);
        } else {
          dispatch("create", player);
        }
      });
    },
    create: ({ commit }, player) => {
      console.log(commit, player);
      return api.players.post(player).then((res) => {
        console.log(res);
        commit("SET", [res.player]);
        return res;
      });
    },
    updateOne: ({ commit }, updatedPlayer) => {
      console.log(commit);
      console.log(updatedPlayer);
      return api.players.put(updatedPlayer).then((res) => {
        console.log(res);
        commit("SET", [res]);
        return res;
      });
    },
    delete: ({ commit }, id) => {
      console.log(id);
      return api.players.delete(id).then(() => {
        commit("DELETE", id);
        return;
      });
    },
  },
  getters: {
    playersIsLoaded: (state) => {
      return state.isLoaded;
    },
    allPlayers: (state) => {
      return state.items;
    },
    getById: (state) => (id) => {
      return state.items[id];
    },
    playerByTeamId: (state) => (id) => {
      return Object.values(state.items).filter((player) => player.teamId == id);
    },
  },
};

export default players;
