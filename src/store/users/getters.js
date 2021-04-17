export default {
  isAuthenticated(state) {
    return state.token != null;
  },
  userData(state) {
    return state;
  },
};
