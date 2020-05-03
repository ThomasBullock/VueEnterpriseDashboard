<template>
  <div class="navbar">
    <md-tabs md-sync-route class="navbar__tabs">
      <md-tab id="tab-teams" md-label="Teams" to="/teams" exact></md-tab>
      <md-tab id="tab-about" md-label="About" to="/about"></md-tab>
      <md-tab id="tab-players" md-label="Players" to="/players"></md-tab>
    </md-tabs>
    <div class="navbar__user-actions">
      <md-menu md-size="big" md-direction="bottom-end">
        <md-button class="md-icon-button" md-menu-trigger>
          <md-icon>account_circle</md-icon>
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
export default {
  name: "NavBar",
  methods: {
    handleLogout() {
      this.$store.dispatch("users/logout").then(() => {
        this.$router.push({ name: "Login" });
      });
    },
    handleGotoAccount() {
      this.$router.push({ name: "Account" });
    }
  }
};
</script>

<style lang="scss" scoped>
.navbar {
  background: $white;
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
}
</style>
