export default {
  SET_TOKEN(state, token) {
    localStorage.setItem("access_token", token);
    state.token = token;
  },
  CLEAR_TOKEN(state) {
    localStorage.removeItem("access_token");
    state.token = null;
  },
  SET_USER(state, user) {
    console.log("SET_USER", user);
    state.id = user.id || user._id;
    state.name = user.name;
    state.avatar = user.avatar;
  },
  CLEAR_USER(state) {
    state.id = null;
    state.name = null;
  },
};
