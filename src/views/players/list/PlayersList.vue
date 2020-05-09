<template>
  <div>
    <h1>Players</h1>
    <md-list class="md-triple-line">
      <md-list-item
        v-for="player in players"
        :key="player._id"
        @click="handleSelectPlayer(player._id)"
      >
        <md-avatar>
          <img :src="player.imgUrl" :alt="player.name + ' ' + player.surname" />
        </md-avatar>

        <div class="md-list-item-text">
          <span>{{player.name}} {{player.surname}}</span>
          <span>Brunch this weekend?</span>
          <p>I'll be in your neighborhood doing errands this week. Do you want to meet?</p>
        </div>

        <!-- <md-button class="md-icon-button md-list-action">
          <md-icon class="md-primary">edit</md-icon>
        </md-button>-->
        <!-- <md-divider class="md-inset"></md-divider> -->
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
  methods: {
    handleSelectPlayer(id) {
      this.$router.push(id);
    }
  }
};
</script>

<style lang="scss" scoped>
</style>