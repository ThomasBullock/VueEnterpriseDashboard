import Vue from "vue";
import VueRouter from "vue-router";
import Dashboard from "../views/Dashboard.vue";
import Auth from "../views/auth/Auth.vue";
import Login from "../views/auth/Login.vue";
import Register from "../views/auth/Register.vue";
import Google from "../views/auth/Google.vue";
import Teams from "@/views/teams/Teams.vue";
import store from "../store";

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
      {
        path: "google",
        name: "Google",
        component: Google,
      },
    ],
  },

  {
    path: "/",
    name: "Dashboard",
    component: Dashboard,
    beforeEnter(to, from, next) {
      store.dispatch("init").then(() => {
        const isAuthenticated = store.getters["users/isAuthenticated"];
        console.log(`beforeEnter ${isAuthenticated}`);
        if (!isAuthenticated) {
          next({ name: "Login" });
        } else {
          next();
        }
      });
    },
    redirect: { name: "Teams" },
    children: [
      {
        path: "account",
        name: "Account",
        component: () =>
          import(
            /* webpackChunkName: "new-player" */ "../views/account/Account.vue"
          ),
      },
      {
        path: "/teams",
        name: "Teams",
        redirect: { name: "TeamsList" },
        component: Teams,
        children: [
          {
            path: "list",
            name: "TeamsList",
            props: () => {
              return { teams: store.getters["teams/allTeams"] };
            },
            component: () =>
              import(
                /* webpackChunkName: "new-player" */ "../views/teams/list/TeamsList.vue"
              ),
          },
          {
            path: ":slug",
            name: "Team",
            // routeToReplace: "Teams",
            props: (route) => {
              return {
                team: store.getters["teams/teamBySlug"](route.params.slug),
                teamId: store.getters["teams/teamIdBySlug"](route.params.slug),
              };
            },
            component: () =>
              import(
                /* webpackChunkName: "new-player" */ "../views/teams/team/Team.vue"
              ),
          },
          {
            path: "edit/:slug",
            name: "EditTeam",
            props: (route) => {
              return {
                team: store.getters["teams/teamBySlug"](route.params.slug),
              };
            },
            component: () =>
              import(
                /* webpackChunkName: "edit-team" */ "../views/teams/edit/EditTeam.vue"
              ),
          },
        ],
      },
      {
        path: "/insights",
        name: "Insights",
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () =>
          import(/* webpackChunkName: "about" */ "../views/Insights.vue"),
      },
      {
        path: "/players",
        name: "Players",
        redirect: { name: "PlayersList" },
        children: [
          {
            path: "list",
            name: "PlayersList",
            props: () => {
              return { players: store.getters["players/allPlayers"] };
            },
            component: () =>
              import(
                /* webpackChunkName: "new-player" */ "../views/players/list/PlayersList.vue"
              ),
          },
          {
            path: "new",
            name: "NewPlayer",
            component: () =>
              import(
                /* webpackChunkName: "new-player" */ "../views/players/new/NewPlayer.vue"
              ),
          },
          {
            path: ":playerId",
            name: "Player",
            props: true,
            component: () =>
              import(
                /* webpackChunkName: "new-player" */ "../views/players/player/Player.vue"
              ),
          },
          {
            path: "edit/:playerId",
            name: "EditPlayer",
            props: true,
            component: () =>
              import(
                /* webpackChunkName: "new-player" */ "../views/players/edit/EditPlayer.vue"
              ),
          },
        ],
        component: () =>
          import(
            /* webpackChunkName: "player" */ "../views/players/Players.vue"
          ),
      },
    ],
  },
];

const router = new VueRouter({
  routes,
});

export default router;
