import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

// Import Vue-Material
import "vue-material/dist/vue-material.min.css";
import "vue-material/dist/theme/default.css";

import { MdButton, MdContent, MdTabs } from "vue-material/dist/components";
Vue.use(MdButton);
Vue.use(MdContent);
Vue.use(MdTabs);

// Custom Styles
import "@/styles/main.scss";

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
