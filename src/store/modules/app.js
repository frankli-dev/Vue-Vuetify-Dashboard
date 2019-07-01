import axios from "axios";
import qs from "qs";
import Vue from "vue";

const vm = new Vue();
// import { setTimeout } from "timers";

const state = {
  items: [],
  checkoutStatus: null,
  showDrawer: true,
  status: "",
  token: localStorage.getItem("token") || "",
  user: {},
  offer: [],
  offer_data: [],
  image: null,
  azure_name: ""
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
  upload_image({ commit }, image) {
    commit("upload_image_request");
    return new Promise((resolve, reject) => {
      let file = image.file   

      var blobUri = 'https://ctmdevblobstore.blob.core.windows.net';
      var blobService = AzureStorage.Blob.createBlobServiceWithSas(blobUri, 'sv=2018-03-28&ss=b&srt=sco&sp=rwdlac&se=2019-08-31T07:59:25Z&st=2019-06-27T23:59:25Z&spr=https&sig=XlOMbfvTtajJ5P7hJt9425vLOaDefMAbYfOl%2F4Z5lcc%3D').withFilter(new AzureStorage.Blob.ExponentialRetryPolicyFilter());

      if (!blobService)
          return;

      // Make a smaller block size when uploading small blobs
      var blockSize = file.size > 1024 * 1024 * 32 ? 1024 * 1024 * 4 : 1024 * 512;
      var options = {
          storeBlobContentMD5 : false,
          blockSize : blockSize
      };
      blobService.singleBlobPutThresholdInBytes = blockSize;

      var finishedOrError = false;

      var s = [];
      var hexDigits = "0123456789abcdef";
      for (var i = 0; i < 36; i++) {
          s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
      }
      s[14] = "4";  // bits 12-15 of the time_hi_and_version field to 0010
      s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1);  // bits 6-7 of the clock_seq_hi_and_reserved to 01
      s[8] = s[13] = s[18] = s[23] = "-";
  
      var uuid = s.join("");

      var arr = file.name.split('.');
      state.azure_name = arr[0] + '.' + uuid + '.' + arr[1];
      var speedSummary = blobService.createBlockBlobFromBrowserFile('offers', state.azure_name, file, options, function(error, result, response) {
          finishedOrError = true;
          if (error) {
            commit("upload_image_failure");
          } else {
            commit("upload_image_success", file);
            resolve(state.azure_name);
          }
      });
      
    });
  },
  sendoffer({ commit }, offerBinding) {
    //console.log(offerBinding);
    return new Promise((resolve, reject) => {
      commit("offer_request");
      axios.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${localStorage.token}`;
      axios.defaults.headers.common["Content-Type"] =
        "application/json";
      axios.defaults.headers.common["Accept"] =
        "application/env.app.ctm.superadmin-v1+json";
      axios({
        url: "https://ctm-api-dev.azurewebsites.net/api/offers/target?api_key=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiI4NjM1NTI0Yy0wMmViLTQxOWItODlkMC01ZTI2Y2QwM2I5NTciLCJzdWIiOiJiMzE2YTMzNy03YjMwLTRhYjQtYTg5Zi0zYWJmNzg1ZWU2MzQiLCJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL3dzLzIwMDgvMDYvaWRlbnRpdHkvY2xhaW1zL3JvbGUiOiJTdXBlckFkbWluIiwiZXhwIjoxNTYyNDE1NTgxfQ.fzvuaZelKgowWH9C0nxjtCpnSScB5q_-y8KVozi0shk",
        method: "post",
        data: qs.stringify(offerBinding)
      })
      .then(resp => {
        commit("send_offer_success", offerBinding);
        console.log(resp);
        resolve(resp);
      })
      .catch(err => {
        commit("send_offer_failed");
        reject(err);
      });
    });
  },
  getoffer({ commit }, params) {
    //console.log(params);
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
  upload_image_request(state) {
    state.status = "upload_image_request";
  },
  upload_image_success(state, file) {
    state.status = "upload_image_success";
    state.image = file;
  },
  upload_image_failure(state) {
    state.status = "upload_image_failure";
  },
  get_offer_request(state) {
    state.status = "sending_offer_request";
  },
  get_offer_success(state, offer) {
    state.status = "get_offer_success";
    state.offer_data = offer;
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
