import actions from "./actions";
import getters from "./getters";
import mutations from "./mutations";

const teams = {
  namespaced: true,
  state: {},
  mutations,
  actions,
  getters,
};

export default teams;
