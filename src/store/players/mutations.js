import Vue from "vue";
import { MUTATIONS } from "@/constants";

export default {
  [MUTATIONS.SET](state, data) {
    data.forEach((item) => {
      Vue.set(state.items, item._id, item);
    });
  },
  [MUTATIONS.DELETE](state, id) {
    Vue.delete(state.items, id);
  },
  [MUTATIONS.SET_IS_LOADED](state, payload) {
    state.isLoaded = payload;
  },
  [MUTATIONS.SET_IS_MAKING_REQUEST](state, payload) {
    state.isMakingRequest = payload;
  },
};
