<template>
  <div>
    <h2>Edit Player</h2>
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
        <label for="number">Number</label>
        <md-input name="number" type="number" v-model="form.number"></md-input>
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
        <label>Player photo</label>
        <md-file accept="image/*" @md-change="handleFile" />
      </md-field>
      <md-field>
        <label for="position">Position</label>
        <md-select v-model="form.position" name="position" id="position">
          <md-option
            v-for="position in positionOptionList"
            :value="position.value"
            :key="position.value"
          >{{position.name}}</md-option>
        </md-select>
      </md-field>
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
      <md-field>
        <label for="status">Status</label>
        <md-select v-model="form.status" name="status" id="status">
          <md-option
            v-for="status in statusOptionList"
            :value="status.value"
            :key="status.value"
          >{{status.name}}</md-option>
        </md-select>
      </md-field>
      <md-button type="submit" class="md-primary" :disabled="isSending">Update player</md-button>
    </form>
  </div>
</template>

<script>
import { validationMixin } from "vuelidate";
import {
  required,
  numeric,
  minLength,
  maxLength
} from "vuelidate/lib/validators";
import { STATUSES, POSITIONS } from "@/constants";

export default {
  name: "EditPlayer",
  mixins: [validationMixin],
  props: {
    playerId: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      form: {},
      isSending: false
    };
  },
  validations: {
    form: {
      name: {
        required,
        maxLength: maxLength(50)
      },
      surname: {
        required,
        maxLength: maxLength(50)
      },
      number: {
        required,
        maxLength: maxLength(2),
        numeric
      },
      height: {
        required,
        minLength: minLength(3),
        numeric
      },
      games: {
        required,
        numeric
      },
      goals: {
        required,
        numeric
      },
      img: {
        required
      },
      teamId: {
        required
      }
    }
  },
  computed: {
    player() {
      return this.$store.getters["players/getById"](this.playerId);
    },
    teamsOptionList() {
      return Object.entries(this.$store.getters["teams/all"]).map(([, v]) => {
        return {
          value: v._id,
          name: v.name
        };
      });
    },
    statusOptionList() {
      return STATUSES.map(v => {
        return {
          value: v,
          name: v
        };
      });
    },
    positionOptionList() {
      return POSITIONS.map(v => {
        return {
          value: v,
          name: v
        };
      });
    }
  },
  methods: {
    handleFile(e) {
      // Todo should delete existing photo
      console.log(e);
      this.form.img = e[0];
    },
    validate() {
      console.log("validate");
      this.$v.$touch();
      console.log("isInvalid = " + this.$v.$invalid);
      if (!this.$v.$invalid) {
        //   console.log("login");
        this.updatePlayer();
      }
    },
    updatePlayer() {
      console.log("updateuy!");
      this.isSending = true;
      this.$store
        .dispatch("players/updateOne", this.form)
        .then(() => {
          this.isSending = false;
          this.displaySnackbar({ message: "updated player" });
          this.$router({ name: "PlayersList" });
        })
        .catch(err => {
          console.log(err);
          this.isSending = false;
        });
    }
  },
  mounted() {
    // need to massage date data

    this.form = (() => {
      const player = this.player;
      player.dob = new Date(this.player.dob);
      return { ...player };
    })();
  }
};
</script>

<style lang="scss" scoped>
</style>