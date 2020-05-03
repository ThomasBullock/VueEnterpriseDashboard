import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

// Import Vue-Material
import "vue-material/dist/vue-material.min.css";
import "vue-material/dist/theme/default.css";

import {
  MdButton,
  MdCard,
  MdContent,
  MdTabs,
  MdField,
  MdDatepicker,
  MdProgress,
  MdMenu,
  MdList,
} from "vue-material/dist/components";
Vue.use(MdButton);
Vue.use(MdCard);
Vue.use(MdContent);
Vue.use(MdTabs);
Vue.use(MdField);
Vue.use(MdDatepicker);
Vue.use(MdProgress);
Vue.use(MdList);
Vue.use(MdMenu);

// Custom Styles
import "@/styles/main.scss";

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
