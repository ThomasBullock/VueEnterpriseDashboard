<template>
  <div class="new-player">
    <form @submit.prevent="validate">
      <md-field>
        <label for="name">Name</label>
        <md-input name="name" type="text" v-model="form.name"></md-input>
      </md-field>
      <md-field>
        <label for="surname">Surname</label>
        <md-input name="surname" type="surname" v-model="form.surname"></md-input>
      </md-field>
      <md-field>
        <label for="height">Height</label>
        <md-input name="height" type="height" v-model="form.height"></md-input>
      </md-field>
      <md-field>
        <label for="games">Games</label>
        <md-input name="games" type="games" v-model="form.games"></md-input>
      </md-field>
    </form>
  </div>
</template>

<script>
export default {
  name: "NewPlayer",
  data() {
    return {
      form: {
        name: "",
        surname: "",
        height: 180,
        games: 0,
        goals: 0,
        dob: new Date(),
        teamId: null
      }
    };
  }
};
</script>

<style lang="scss" scoped>
</style>