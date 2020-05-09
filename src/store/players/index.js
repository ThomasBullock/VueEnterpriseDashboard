import api from "@/api/";
import cloudinary from "@/api/cloudinary";

const players = {
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
      console.log("yep", commit);
      return api.players.getAll().then((res) => {
        commit("SET", res);
        return res;
      });
    },
    create: ({ commit }, player) => {
      console.log(commit, player);

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
        return api.players.post(player).then((res) => {
          console.log(res);
          commit("SET", [res.player]);
          return res;
        });
      });
    },
    updateOne: ({ commit }, updatedPlayer) => {
      console.log(commit);
      console.log(updatedPlayer);

      const photoForm = new FormData();
      photoForm.append("file", updatedPlayer.img);
      photoForm.append("api_key", process.env.VUE_APP_CLOUDINARY_KEY);
      photoForm.append("upload_preset", process.env.VUE_APP_CLOUDINARY_PRESET);
      photoForm.append("timestamp", (Date.now() / 1000) | 0);

      console.log(photoForm);

      return cloudinary.upload(photoForm).then((res) => {
        updatedPlayer.imgUrl = res.url;
        updatedPlayer.imgPublicId = res.public_id;
        return api.players.put(updatedPlayer).then((res) => {
          console.log(res);
          commit("SET", [res]);
          return res;
        });
      });
    },
  },
  getters: {
    all: (state) => {
      return state;
    },
    getById: (state) => (id) => {
      return state[id];
    },
  },
};

export default players;
