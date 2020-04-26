import Vue from "vue";
import VueRouter from "vue-router";
import Dashboard from "../views/Dashboard.vue";
import Auth from "../views/auth/Auth.vue";
import Login from "../views/auth/Login.vue";
import Register from "../views/auth/Register.vue";

Vue.use(VueRouter);

const routes = [
  {
    name: "Auth",
    path: "/auth",
    redirect: { name: "Login" },
    component: Auth,
    children: [
      {
        path: "login",
        name: "Login",
        component: Login,
      },
      {
        path: "register",
        name: "Register",
        component: Register,
      },
    ],
  },

  {
    path: "/",
    name: "Dashboard",
    component: Dashboard,
    children: [
      {
        path: "/about",
        name: "About",
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () =>
          import(/* webpackChunkName: "about" */ "../views/About.vue"),
      },
    ],
  },
];

const router = new VueRouter({
  routes,
});

export default router;
