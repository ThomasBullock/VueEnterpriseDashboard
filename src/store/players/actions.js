import api from "@/api/";
import cloudinary from "@/api/cloudinary";
import { ACTIONS, MUTATIONS } from "@/constants";

export default {
  [ACTIONS.getAll]: ({ commit }) => {
    return api.players.getAll().then((res) => {
      commit("SET", res);
      commit("SET_IS_LOADED", true);
      return res;
    });
  },
  [ACTIONS.create]: ({ commit }, player) => {
    console.log(commit, player);
    return api.players.post(player).then((res) => {
      commit(MUTATIONS.SET, [res.player]);
      return res;
    });
  },
  [ACTIONS.updateOne]: ({ commit }, updatedPlayer) => {
    console.log(commit);
    console.log(updatedPlayer);
    return api.players.put(updatedPlayer).then((res) => {
      console.log(res);
      commit(MUTATIONS.SET, [res]);
      return res;
    });
  },
  [ACTIONS.delete]: ({ commit }, id) => {
    console.log(id);
    return api.players.delete(id).then(() => {
      commit(MUTATIONS.DELETE, id);
      return;
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
        dispatch(ACTIONS.updateOne, player);
      } else {
        dispatch(ACTIONS.create, player);
      }
    });
  },
};
