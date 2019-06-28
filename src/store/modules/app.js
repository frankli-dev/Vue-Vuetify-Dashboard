import axios from "axios";
import qs from "qs";
import { setTimeout } from "timers";
const state = {
  items: [],
  checkoutStatus: null,
  showDrawer: true,
  status: "",
  token: localStorage.getItem("token") || "",
  user: {},
  offer: [],
  offer_data: []
};

// getters
const getters = {
  isLoggedIn: state => !!state.token,
  authStatus: state => state.status
};
// actions
const actions = {
  login({ commit }, user) {
    console.log(user);
    return new Promise((resolve, reject) => {
      commit("auth_request");
      axios({
        url: "https://ctm-api-dev.azurewebsites.net/api/token",
        method: "post",
        data: qs.stringify(user)
      })
        .then(resp => {
          const token = resp.data.data.access_token;
          console.log(token);
          localStorage.setItem("token", token);
          axios.defaults.headers.common["Authorization"] = token;
          commit("auth_success", token, user);
          resolve(resp);
        })
        .catch(err => {
          commit("auth_error");
          localStorage.removeItem("token");
          reject(err);
        });
    });
  },
  sendoffer({ commit }, offerBinding) {
    console.log(offerBinding);
    return new Promise((resolve, reject) => {
      commit("offer_request");
      axios({
        url: "https://ctm-api-dev.azurewebsites.net/api/offers/target",
        method: "post",
        data: qs.stringify(offerBinding)
      })
      .then(resp => {
        commit("send_offer_success", offerBinding);
        resolve(resp);
      })
      .catch(err => {
        commit("send_offer_failed");
        reject(err);
      });
    });
  },
  getoffer({ commit }, params) {
    console.log(params);
    return new Promise((resolve, reject) => {
      commit("get_offer_request");
      axios({
        url: "https://ctm-api-dev.azurewebsites.net/api/offers",
        method: "get",
        data: qs.stringify(params)
      })
      .then(resp => {
        commit("get_offer_success", resp.data.offer);
        resolve(resp);
      })
      .catch(err => {
        commit("get_offer_failed");
        reject(err);
      });
    });
  },
  logout({ commit }) {
    return new Promise(resolve => {
      commit("logout");
      localStorage.removeItem("token");
      delete axios.defaults.headers.common["Authorization"];
      resolve();
    });
  }
};

// mutations
const mutations = {
  auth_request(state) {
    state.status = "loading";
  },
  auth_success(state, token, user) {
    state.status = "success";
    state.token = token;
    state.user = user;
  },
  auth_error(state) {
    state.status = "error";
  },
  get_offer_request(state) {
    state.status = "sending_offer_request";
  },
  get_offer_success(state, offer) {
    state.status = "get_offer_success";
    offer_data = offer;
  },
  get_offer_failed(state) {
    state.status = "get_offer_failed";
  },
  offer_request(state) {
    state.status = "sending_offer";
  },
  send_offer_success(state, offerBinding) {
    state.status = "sending_offer_success";
    state.offer = offerBinding;
  },
  send_offer_failed(state) {
    state.status = "sending_offer_failed";
  },
  logout(state) {
    state.status = "";
    state.token = "";
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
