<template>
  <div class="teams">
    <md-card v-for="team in allTeams" :key="team._id" class="team-card">
      <md-card-header>
        <md-card-header-text>
          <div class="md-title">{{ team.name }}</div>
          <div class="md-subhead">Est. {{ team.founded }}</div>
        </md-card-header-text>

        <md-card-media class="team-card__logo md-elevation-2">
          <img :src="team.logo" :alt="team.name + 'logo'" />
        </md-card-media>
      </md-card-header>
      <md-card-actions>
        <md-button
          class="md-raised md-primary"
          :to="`/players/list?filter=${team._id}`"
          >View List</md-button
        >
      </md-card-actions>
    </md-card>
    <router-view></router-view>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "TeamsList",
  computed: {
    ...mapGetters("teams", ["allTeams"]),
  },
};
</script>

<style lang="scss" scoped>
.teams {
  /* padding: $base-spacing * 2; */
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  margin: -12px 0 0 -12px;
  width: calc(100% + 12px);
  padding: $base-spacing;
}

.team-card {
  flex: 1 1 25%;
  margin: 12px 0 0 12px;

  &__logo {
    background: $white;
    padding: $base-spacing; //$base-spacing $large-spacing;
    border-radius: $small-border-radius;
    border: solid 1px $oil;
    display: flex;

    img {
      align-self: center;
    }
  }
}

.md-card-actions {
  margin-top: $base-spacing;
}
</style>
