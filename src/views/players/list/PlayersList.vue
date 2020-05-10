<template>
  <div>
    <h1>Players</h1>
    <md-field>
      <label for="team">Team</label>
      <md-select v-model="filter" name="team" id="team">
        <md-option
          v-for="team in teamsOptionList"
          :value="team.value"
          :key="team.value"
        >{{team.name}}</md-option>
      </md-select>
    </md-field>
    <md-list class="md-triple-line">
      <md-list-item
        v-for="player in playersFiltered"
        :key="player._id"
        @click="handleSelectPlayer(player._id)"
      >
        <md-avatar>
          <img :src="player.imgUrl" :alt="player.name + ' ' + player.surname" />
        </md-avatar>

        <div class="md-list-item-text">
          <span>{{player.name}} {{player.surname}}</span>
        </div>
      </md-list-item>
    </md-list>
  </div>
</template>

<script>
export default {
  name: "PlayersList",
  props: {
    players: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      filter: null
    };
  },
  computed: {
    teamsOptionList() {
      return Object.entries(this.$store.getters["teams/all"])
        .map(([, v]) => {
          return {
            value: v._id,
            name: v.name
          };
        })
        .concat([
          {
            value: "",
            name: "All"
          }
        ]);
    },
    playersFiltered() {
      return !this.filter
        ? this.players
        : Object.keys(this.players)
            .filter(key => {
              console.log(key);
              console.log(this.players[key]);
              return this.players[key].teamId === this.filter;
            })
            .reduce((obj, key) => {
              return {
                ...obj,
                [key]: this.players[key]
              };
            }, {});
      // : Object.keys(this.players)
      //     .map(([, v]) => v)
      //     .filter(player => player.teamId === this.filter);
    }
    // filter: {
    //   get() {

    //   }
    // }
  },
  methods: {
    handleSelectPlayer(id) {
      this.$router.push(id);
    }
  }
};
</script>

<style lang="scss" scoped>
</style>