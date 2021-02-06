<template>
  <div class="navbar md-elevation-3">
    <md-tabs md-sync-route class="navbar__tabs md-transparent">
      <md-tab id="tab-teams" md-label="Teams" to="/teams" exact></md-tab>
      <md-tab id="tab-players" md-label="Players" to="/players"></md-tab>
      <md-tab id="tab-about" md-label="Insights" to="/insights"></md-tab>
    </md-tabs>
    <div class="navbar__user-actions">
      <md-menu md-size="big" md-direction="bottom-end">
        <md-button class="md-icon-button" md-menu-trigger>
          <md-avatar>
            <img :src="userData.avatar" :alt="userData.name + ' avatar '" />
          </md-avatar>
          <!-- <md-icon>account_circle</md-icon> -->
        </md-button>

        <md-menu-content>
          <md-menu-item @click="handleGotoAccount">
            <span>Account</span>
            <md-icon>face</md-icon>
          </md-menu-item>

          <md-menu-item @click="handleLogout">
            <span>Logout</span>
            <md-icon>exit_to_app</md-icon>
          </md-menu-item>
        </md-menu-content>
      </md-menu>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "NavBar",
  computed: {
    ...mapGetters("users", ["userData"]),
  },
  methods: {
    handleLogout() {
      this.$store.dispatch("users/logout").then(() => {
        this.$router.push({ name: "Login" });
      });
    },
    handleGotoAccount() {
      this.$router.push({ name: "Account" });
    },
  },
};
</script>

<style lang="scss" scoped>
.navbar {
  padding: 0 $base-spacing;
  z-index: 1;
  position: relative;
  display: flex;
  &__tabs {
    flex: 1 1 50%;
  }

  &__user-actions {
    flex: 1 1 50%;
    display: flex;
    justify-content: flex-end;

    .md-icon-button {
      margin-top: 4px;
      margin-right: 4px;
    }
  }

  .md-tabs.md-theme-default.md-tabs-navigation {
    background-color: none !important;
  }
}
</style>
