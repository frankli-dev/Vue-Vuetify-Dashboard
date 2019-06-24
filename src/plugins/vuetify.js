import Vue from "vue"
import Vuetify from "vuetify/lib"
import "../theme/default.styl"
Vue.use(Vuetify, {
  theme: {
    primary: "#010101",
    secondary: "#e7792a",
    accent: "#82B1FF",
    error: "#FF5252",
    info: "#2196F3",
    success: "#4CAF50",
    warning: "#FFC107"
  },
  customProperties: true
})
