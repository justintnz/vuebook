import AuthService from "../services/auth.service";

const localAuth = JSON.parse(localStorage.getItem("auth"));
const state = localAuth
  ? {
      status: { loggedIn: true },
      user: localAuth.user,
      token: localAuth.access_token,
    }
  : { status: { loggedIn: false }, user: null, token: null };
const getters = {
  isAuthenticated: (state) => !!state.user,
  statePosts: (state) => state.posts,
  stateUser: (state) => state.user,
  stateToken: (state) => state.token,
};
export const auth = {
  namespaced: true,
  state,
  getters,
  actions: {
    login({ commit }, user) {
      return AuthService.login(user).then(
        (user) => {
          commit("loginSuccess", user);
          return Promise.resolve(user);
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
    loginSuccess(state, user) {
      state.status.loggedIn = true;
      state.user = user;
    },
    loginFailure(state) {
      state.status.loggedIn = false;
      state.user = null;
    },
    logout(state) {
      state.status.loggedIn = false;
      state.user = null;
    },
    registerSuccess(state) {
      state.status.loggedIn = false;
    },
    registerFailure(state) {
      state.status.loggedIn = false;
    },
  },
};
