<template>
  <div class="teams">
    <md-card v-for="team in all" :key="team._id" class="team-card md-primary">
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
        <md-button :to="`/players/list?filter=${team._id}`"
          >View List</md-button
        >
      </md-card-actions>
    </md-card>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "Teams",
  computed: {
    ...mapGetters("teams", ["all"]),
  },
};
</script>

<style lang="scss" scoped>
.teams {
  /* padding: $base-spacing * 2; */
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
}

.team-card {
  flex: 1 1 25%;

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
