<template>
  <div class="player">
    <div v-if="!isDeleting">
      <h2>{{player.number}}. {{ player.name}} {{ player.surname}}</h2>
      <span>
        <strong>Height:</strong>
        {{player.height}}
      </span>
      <span>
        <strong>Games:</strong>
        {{player.games}}
      </span>
      <span>
        <strong>Goals:</strong>
        {{player.goals}}
      </span>
      <div class="player__actions">
        <md-button
          class="md-icon-button md-list-action"
          @click="$router.push(`edit/${player._id}`)"
        >
          <md-icon class="md-primary">edit</md-icon>
        </md-button>
        <md-button class="md-icon-button md-list-action" @click="handleDelete">
          <md-icon class="md-accent">delete</md-icon>
        </md-button>
      </div>
    </div>
    <div class="spinner-wrapper" v-else>
      <md-progress-spinner md-mode="indeterminate"></md-progress-spinner>
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
  data() {
    return {
      isDeleting: false
    };
  },
  computed: {
    player() {
      return this.$store.getters["players/getById"](this.playerId);
    }
  },
  methods: {
    handleDelete() {
      this.isDeleting = true;
      this.$store.dispatch("players/delete", this.player._id).then(() => {
        this.$router.push({ name: "PlayersList" });
      });
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