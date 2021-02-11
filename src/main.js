import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

// Import Vue-Material
import "vue-material/dist/vue-material.min.css";
// import "vue-material/dist/theme/default-dark.css";

// Global components / mixins
import "@/components/global/global";
import { displaySnackbar } from "@/mixins/displaySnackbar";
Vue.mixin(displaySnackbar);

import {
  MdAvatar,
  MdButton,
  MdCard,
  MdContent,
  MdTabs,
  MdField,
  MdDatepicker,
  MdProgress,
  MdMenu,
  MdList,
  MdSnackbar,
  MdDialog,
  MdDivider,
  MdIcon,
  MdEmptyState,
} from "vue-material/dist/components";
Vue.use(MdAvatar);
Vue.use(MdButton);
Vue.use(MdCard);
Vue.use(MdContent);
Vue.use(MdTabs);
Vue.use(MdField);
Vue.use(MdDatepicker);
Vue.use(MdProgress);
Vue.use(MdList);
Vue.use(MdMenu);
Vue.use(MdSnackbar);
Vue.use(MdDialog);
Vue.use(MdDivider);
Vue.use(MdIcon);
Vue.use(MdEmptyState);

// Custom Styles
import "@/styles/main.scss";

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
