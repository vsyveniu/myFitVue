import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import axios from "axios";
import store from './store';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'


Vue.config.productionTip = false;
Vue.prototype.$axios = axios;
const token = localStorage.getItem("token");
if (token) {
  Vue.prototype.$axios.defaults.headers.common["authtoken"] = token;
}
console.log('SHIIIIY');
console.log(process.env.VUE_APP_API_HOST);
Vue.prototype.$axios.defaults.baseUrl = process.env.VUE_APP_API_HOST;

Vue.component('font-awesome-icon', FontAwesomeIcon);

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
