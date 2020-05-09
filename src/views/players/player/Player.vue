<template>
  <div class="player">
    <h2>{{player.number}}. {{ player.name}} {{ player.surname}}</h2>
    <span>
      <strong>Height:</strong>
      {{player.height}}
    </span>
    <div class="player__actions">
      <md-button class="md-icon-button md-list-action" @click="$router.push(`edit/${player._id}`)">
        <md-icon class="md-primary">edit</md-icon>
      </md-button>
      <md-button class="md-icon-button md-list-action">
        <md-icon class="md-accent">delete</md-icon>
      </md-button>
    </div>
  </div>
</template>

<script>
export default {
  name: "Player",
  props: {
    playerId: {
      type: String,
      required: true
    }
  },
  computed: {
    player() {
      return this.$store.getters["players/getById"](this.playerId);
    }
  }
};
</script>

<style lang="scss" scoped>
.player {
  &__actions {
    margin-top: $base-spacing;
  }
}
</style>