<template>
  <div class="dashboard">
    <NavBar />
    <router-view v-if="dashboardReady" />
    <div class="spinner-wrapper" v-else>
      <md-progress-spinner md-mode="indeterminate"></md-progress-spinner>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import NavBar from "@/components/NavBar";
import { mapGetters } from "vuex";

export default {
  name: "Dashboard",
  components: {
    NavBar,
  },
  data() {
    return {
      loading: false,
    };
  },

  computed: {
    ...mapGetters("teams", ["all"]),
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
.spinner-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 90vh;
}
</style>
