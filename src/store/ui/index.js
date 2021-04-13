const ui = {
  namespaced: true,
  state: {
    snackbar: {
      visible: false,
      message: "",
      type: null,
    },
  },
  getters: {
    snackBarStatus: (state) => {
      return state.snackbar;
    },
  },
  mutations: {
    SET_SNACKBAR(state, data) {
      state.snackbar = data;
    },
    RESET_SNACKBAR(state) {
      state.snackbar = {
        visible: false,
        message: "",
        type: null,
      };
    },
  },
  actions: {
    displaySnackbar: (
      { commit },
      { visible = true, type = "notfication", message }
    ) => {
      commit("SET_SNACKBAR", { visible, type, message });
    },
  },
};

export default ui;
