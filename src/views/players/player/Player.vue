<template>
  <div class="player">
    <md-card v-if="!isDeleting">
      <md-card-header>
        <md-card-header-text>
          <div class="md-title">{{ player.name }} {{ player.surname }}</div>
          <div class="md-subhead">{{ team.name }}</div>
          <div class="md-subhead">{{ player.position }}</div>
        </md-card-header-text>

        <md-card-media md-big>
          <img
            :src="player.imgUrl ? player.imgUrl : DEFAULT_PLAYER_IMG"
            :alt="player.name + ' ' + player.surname"
          />
        </md-card-media>
      </md-card-header>
      <md-card-content>
        <span>
          <strong>Height:</strong>
          {{ player.height }}cm
        </span>
        <span>
          <strong>Weight:</strong>
          {{ player.weight }}kg
        </span>
        <span>
          <strong>Games:</strong>
          {{ player.games }}
        </span>
      </md-card-content>

      <md-card-actions md-alignment="left">
        <md-button
          class="md-icon-button md-list-action"
          @click="$router.push(`edit/${player._id}`)"
        >
          <md-icon class="md-primary">edit</md-icon>
        </md-button>
        <md-button class="md-icon-button md-list-action" @click="handleDelete">
          <md-icon class="md-accent">delete</md-icon>
        </md-button>
      </md-card-actions>
    </md-card>

    <div class="spinner-wrapper" v-else>
      <md-progress-spinner md-mode="indeterminate"></md-progress-spinner>
    </div>
  </div>
</template>

<script>
import { DEFAULT_PLAYER_IMG } from "@/constants";

export default {
  name: "Player",
  props: {
    playerId: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      isDeleting: false,
      DEFAULT_PLAYER_IMG: DEFAULT_PLAYER_IMG,
    };
  },
  computed: {
    player() {
      return this.$store.getters["players/getById"](this.playerId);
    },
    team() {
      return this.$store.getters["teams/teamById"](this.player.teamId);
    },
  },
  methods: {
    handleDelete() {
      this.isDeleting = true;
      this.$store.dispatch("players/delete", this.player._id).then(() => {
        this.$router.push({ name: "PlayersList" });
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.player {
  &__actions {
    margin-top: $base-spacing;
  }

  .md-card {
    width: 620px;
    margin: 4px;
    display: inline-block;
    vertical-align: top;

    .md-card-media.md-big {
      width: 240px;
      height: 240px;
      flex: 0 0 240px;
    }
  }
}
</style>
