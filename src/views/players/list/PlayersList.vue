<template>
  <div>
    <h1 class="page-heading">Players</h1>
    <md-field>
      <label for="team">Team</label>
      <md-select v-model="filter" name="team" id="team">
        <md-option
          v-for="team in teamsOptionList"
          :value="team.value"
          :key="team.value"
          >{{ team.name }}</md-option
        >
      </md-select>
    </md-field>
    <md-list v-if="Object.keys(playersFiltered).length" class="md-triple-line">
      <md-list-item
        v-for="player in playersFiltered"
        :key="player._id"
        @click="handleSelectPlayer(player._id)"
      >
        <md-avatar>
          <img
            class="player-thumb"
            :src="player.imgUrl ? player.imgUrl : DEFAULT_PLAYER_IMG"
            :alt="player.name + ' ' + player.surname"
          />
        </md-avatar>

        <div class="md-list-item-text">
          <span>{{ player.name }} {{ player.surname }}</span>
        </div>
      </md-list-item>
    </md-list>
    <EmptyState
      v-if="!Object.keys(playersFiltered).length"
      icon="person_add"
      label="No players"
      description="Add a player to start building this teams player list."
    >
      <template v-slot:action>
        <md-button class="md-primary md-raised" @click="handleAddPlayer"
          >Add first player</md-button
        >
      </template>
    </EmptyState>
  </div>
</template>

<script>
import EmptyState from "@/components/EmptyState";
import { DEFAULT_PLAYER_IMG } from "@/constants";

export default {
  name: "PlayersList",
  props: {
    players: {
      type: Object,
      required: true,
    },
  },
  components: {
    EmptyState,
  },
  data() {
    return {
      filter: null,
      DEFAULT_PLAYER_IMG: DEFAULT_PLAYER_IMG,
    };
  },
  computed: {
    teamsOptionList() {
      return Object.entries(this.$store.getters["teams/allTeams"])
        .map(([, v]) => {
          return {
            value: v._id,
            name: v.name,
          };
        })
        .concat([
          {
            value: "",
            name: "All",
          },
        ]);
    },
    playersFiltered() {
      return !this.filter
        ? this.players
        : Object.keys(this.players)
            .filter((key) => {
              return this.players[key].teamId === this.filter;
            })
            .reduce((obj, key) => {
              return {
                ...obj,
                [key]: this.players[key],
              };
            }, {});
    },
  },
  methods: {
    handleSelectPlayer(id) {
      this.$router.push(id);
    },
    handleAddPlayer() {
      this.$router.push("new");
    },
  },
  mounted() {
    if (this.$route.query.filter) {
      this.filter = this.$route.query.filter;
    }
  },
};
</script>

<style lang="scss" scoped>
.player-thumb {
  background: $black;
}
</style>
