import actions from "./actions";
import getters from "./getters";
import mutations from "./mutations";

const users = {
  namespaced: true,
  state: {
    id: null,
    name: null,
    token: null,
    avatar: null,
  },
  getters,
  mutations,
  actions,
};

export default users;
