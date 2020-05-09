const ui = {
  namespaced: true,
  state: {
    snackbar: {
      visible: false,
      duration: null,
      message: "",
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
        duration: null,
        message: "",
      };
    },
  },
  actions: {
    displaySnackbar: (
      { commit },
      { visible = true, duration = 4000, message }
    ) => {
      commit("SET_SNACKBAR", { visible, duration, message });
    },
  },
};

export default ui;
