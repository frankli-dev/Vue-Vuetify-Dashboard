import Vue from "vue";
import Vuex from "vuex";
import VeeValidate from "vee-validate";
import app from "./modules/app";

Vue.use(Vuex);
Vue.use(VeeValidate);

export default new Vuex.Store({
  modules: {
    app
  }
});
