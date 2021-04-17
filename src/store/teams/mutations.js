import { MUTATIONS } from "@/constants";

export default {
  [MUTATIONS.SET](state, data) {
    data.forEach((item) => {
      state[item._id] = item;
    });
  },
};
