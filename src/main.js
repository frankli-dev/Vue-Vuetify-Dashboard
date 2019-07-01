import Vue from "vue";
import VueAzureUploader from 'vue-azure-blob-upload'

Vue.use(VueAzureUploader);
import App from "./App.vue";
import router from "./router/";
import store from "./store/";
import Axios from "axios";
import "./registerServiceWorker";
import "./plugins/vuetify";
import "roboto-fontface/css/roboto/roboto-fontface.css";
import "font-awesome/css/font-awesome.css";
import VuetifyGoogleAutocomplete from 'vuetify-google-autocomplete';

Vue.config.productionTip = false;
Vue.prototype.$http = Axios;
const token = localStorage.getItem("token");
if (token) {
  Vue.prototype.$http.defaults.headers.common["Authorization"] = token;
}
Vue.prototype.$http.defaults.headers.common["Accept"] = "application/json";
Vue.prototype.$http.defaults.headers.common["Content-Type"] =
  "application/x-www-form-urlencoded";
Vue.use(VuetifyGoogleAutocomplete, {
  apiKey: 'AIzaSyCpJOWuQiXHTAnmdxgqjPRCwOKkTllFtsg'
});


new Vue({
  router,
  store,
  render: h => h(App),
  created() {
    //ctm-api
  }
}).$mount("#app");
