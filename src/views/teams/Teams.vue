<template>
  <div class="teams">
    <md-card v-for="team in all" :key="team._id" class="teams__card md-primary">
      <md-card-header>
        <md-card-header-text>
          <div class="md-title">{{team.name}}</div>
          <div class="md-subhead">Est. {{team.founded}}</div>
        </md-card-header-text>

        <md-card-media>
          <img :src="team.logo" :alt="team.name + 'logo'" />
        </md-card-media>
      </md-card-header>

      <md-card-actions>
        <md-button>Action</md-button>
        <md-button>Action</md-button>
      </md-card-actions>
    </md-card>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "Teams",
  computed: {
    ...mapGetters("teams", ["all"])
  }
};
</script>

<style lang="scss" scoped>
.teams {
  padding: $base-spacing * 2;
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
}

.teams__card {
  flex: 1 1 25%;
}
</style>