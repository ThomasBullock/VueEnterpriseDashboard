import api from "@/api/";
import { ACTIONS, MUTATIONS } from "@/constants";

export default {
  [ACTIONS.getAll]: ({ commit }) => {
    return api.teams.getAll().then((res) => {
      commit(MUTATIONS.SET, res);
      return res;
    });
  },
};
