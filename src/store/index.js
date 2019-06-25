import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
import app from "./modules/app";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    app
  }
});
