<template>
  <div class="players">
    <!-- <nav class="sidebar">
      <router-link class="sidebar-link" :to="{ name: 'PlayersList' }">
        Player List
      </router-link>
      <router-link class="sidebar-link" :to="{ name: 'NewPlayer' }">
        Add Player
      </router-link>
    </nav> -->
    <!-- <main> -->
    <router-view v-if="!isLoading"></router-view>
    <div class="spinner-wrapper" v-else>
      <md-progress-spinner md-mode="indeterminate"></md-progress-spinner>
    </div>
    <!-- </main> -->
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { isEmpty } from "@/helpers";

export default {
  name: "Players",
  data() {
    return {
      isLoading: true,
    };
  },
  computed: {
    ...mapGetters("players", ["allPlayers"]),
  },
  created() {
    if (isEmpty(this.all)) {
      this.$store.dispatch("players/getAll").then(() => {
        this.isLoading = false;
      });
    } else {
      this.isLoading = false;
    }
  },
};
</script>

<style lang="scss" scoped>
.players {
  padding: $large-spacing $large-spacing * 2;

  nav {
    background: $white;
    flex: 1 1 20%;
    display: flex;
    flex-direction: column;
    padding-right: $base-spacing;
  }
}

.sidebar {
  padding-top: $large-spacing;
  z-index: 0;
}

.sidebar-link {
  padding: $base-spacing;
  border-bottom: solid 1px $smoke;
}
</style>
