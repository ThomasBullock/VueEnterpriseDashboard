import actions from "./actions";
import getters from "./getters";
import mutations from "./mutations";

const players = {
  namespaced: true,
  state: {
    items: {},
    isMakingRequest: false,
    isLoaded: false,
  },
  actions,
  mutations,
  getters,
};

export default players;
