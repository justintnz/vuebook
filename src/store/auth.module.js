import AuthService from "../services/auth.service";

const localAuth = JSON.parse(localStorage.getItem("auth"));
const state = localAuth
  ? { status: { loggedIn: true }, user: localAuth }
  : { status: { loggedIn: false }, user: null };
const getters = {
  isAuthenticated: (state) => !!state.user && !!state.user.access_token,
  stateUser: (state) => state.user,
  stateToken: (state) => (state.user ? state.user.access_token : ""),
};
export const auth = {
  namespaced: true,
  state,
  getters,
  actions: {
    login({ commit }, user) {
      return AuthService.login(user).then(
        (res) => {
          if (res.access_token) {
            commit("loginSuccess");
            return Promise.resolve(res);
          } else {
            commit("loginFailure");
            return Promise.reject(res);
          }
        },
        (error) => {
          commit("loginFailure");
          return Promise.reject(error);
        }
      );
    },
    logout({ commit }) {
      AuthService.logout();
      commit("logout");
    },
    register({ commit }, user) {
      return AuthService.register(user).then(
        (response) => {
          commit("registerSuccess");
          return Promise.resolve(response.data);
        },
        (error) => {
          commit("registerFailure");
          return Promise.reject(error);
        }
      );
    },
  },
  mutations: {
    loginSuccess(state) {
      let auth = JSON.parse(localStorage.getItem("auth"));
      state.status.loggedIn = true;
      state.user = auth;
      state.token = auth.access_token;
    },
    loginFailure(state) {
      state.status.loggedIn = false;
      state.user = null;
      state.token = null;
    },
    logout(state) {
      state.status.loggedIn = false;
      state.user = null;
      state.token = null;
    },
    registerSuccess(state) {
      state.status.loggedIn = false;
      state.user = null;
      state.token = null;
    },
    registerFailure(state) {
      state.status.loggedIn = false;
      state.user = null;
      state.token = null;
    },
  },
};
