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
      <md-field>
        <label for="goals">Goals</label>
        <md-input name="goals" type="goals" v-model="form.goals"></md-input>
      </md-field>
      <md-datepicker v-model="form.dob" />
      <md-field>
        <label for="team">Team</label>
        <md-select v-model="form.teamId" name="team" id="team">
          <md-option
            v-for="team in teamsOptionList"
            :value="team.value"
            :key="team.value"
          >{{team.name}}</md-option>
        </md-select>
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
        dob: new Date("01-01-1990"),
        teamId: null
      }
    };
  },
  computed: {
    teamsOptionList() {
      return Object.entries(this.$store.getters["teams/all"]).map(([, v]) => {
        return {
          value: v._id,
          name: v.name
        };
      });
    }
  }
};
</script>

<style lang="scss" scoped>
</style>