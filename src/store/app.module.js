import axios from "axios";
const state = { services: [] };
const getters = {
  getServiceById: (state) => (id) => {
    return state.services.find((service) => service.id == id);
  },
};

export const app = {
  namespaced: true,
  state,
  getters,
  actions: {
    loadServices({ commit }) {
      const body = {
        query: ` query{services { id, name,image,description}}`,
      };

      return axios.post("", body).then(
        (response) => {
          commit("loadServicesSuccess", response.data.data);
          return Promise.resolve(response.data.data);
        },
        (error) => {
          commit("loadServicesFailure");
          return Promise.reject(error);
        }
      );
    },
  },
  mutations: {
    loadServicesSuccess(state, resData) {
      state.services = resData.services;
    },
    loadServicesFailure(state) {
      state.services = [];
    },
  },
};
