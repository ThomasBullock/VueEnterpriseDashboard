import authApi from "@/api/auth";

export default {
  login: ({ commit }, userDetails) => {
    console.log(commit, userDetails);
    return authApi
      .login({
        ...userDetails,
      })
      .then((res) => {
        console.log(res);
        commit("SET_TOKEN", res.token);
        commit("SET_USER", res);
        return res;
      });
  },
  loginWithGoogle: ({ commit }) => {
    console.log(commit);
    window.location = "http://localhost:3000/auth/google";
  },
  logout: ({ commit }) => {
    console.log("logout");
    commit("CLEAR_TOKEN");
    commit("CLEAR_USER");
    return;
  },
  register: ({ commit }, userDetails) => {
    return authApi
      .register({
        ...userDetails,
      })
      .then((res) => {
        console.log(res);
        commit("SET_USER", res);
      });
  },
};
