<template>
  <div class="dashboard">
    <NavBar />
    <div class="dashboard__container">
      <SideBar />
      <main class="dashboard__main">
        <router-view v-if="dashboardReady" />
        <div class="spinner-wrapper" v-else>
          <md-progress-spinner md-mode="indeterminate"></md-progress-spinner>
        </div>
      </main>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import NavBar from "@/components/NavBar";
import SideBar from "@/components/SideBar";
import { mapGetters } from "vuex";

export default {
  name: "Dashboard",
  components: {
    NavBar,
    SideBar,
  },
  data() {
    return {
      loading: false,
    };
  },

  computed: {
    ...mapGetters("teams", ["allTeams"]),
    dashboardReady() {
      return (
        this.$store.state.dashboardIsLoaded && !this.$store.state.isLoading
      );
    },
  },
  created() {
    if (!this.$store.state.dashboardIsLoaded) {
      this.$store.dispatch("fetchDashboard").then(() => {});
    }
  },
};
</script>
<style lang="scss" scoped>
.dashboard {
  height: 100%;
  &__container {
    display: flex;

    height: calc(100% - #{$navbar-height});
  }

  &__main {
    width: 100%;
  }
}

.spinner-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 90vh;
}
</style>
