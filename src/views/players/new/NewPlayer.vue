<template>
  <div class="new-player">
    <form @submit.prevent="validateForm(createPlayer)">
      <md-field :class="getValidationClass('name')">
        <label for="name">Name</label>
        <md-input name="name" type="text" v-model="form.name"></md-input>
        <span class="md-error" v-if="!$v.form.name.required"
          >Name is required</span
        >
      </md-field>
      <md-field :class="getValidationClass('surname')">
        <label for="surname">Surname</label>
        <md-input
          name="surname"
          type="surname"
          v-model="form.surname"
        ></md-input>
        <span class="md-error" v-if="!$v.form.surname.required"
          >Surname is required</span
        >
      </md-field>
      <md-field :class="getValidationClass('number')">
        <label for="number">Number</label>
        <md-input name="number" type="number" v-model="form.number"></md-input>
        <span class="md-error" v-if="!$v.form.number.required"
          >The players number is required</span
        >
      </md-field>
      <md-field :class="getValidationClass('height')">
        <label for="height">Height</label>
        <md-input name="height" type="number" v-model="form.height"></md-input>
        <span
          class="md-error"
          v-if="!$v.form.height.required || !$v.form.height.between"
          >{{
            !$v.form.height.between
              ? "Height must be realistic!"
              : "The players height is required"
          }}</span
        >
      </md-field>
      <md-field :class="getValidationClass('weight')">
        <label for="weight">Weight</label>
        <md-input name="weight" type="number" v-model="form.weight"></md-input>
        <span class="md-error" v-if="!$v.form.weight.required"
          >The players weight is required</span
        >
      </md-field>
      <md-field :class="getValidationClass('games')">
        <label for="games">Games</label>
        <md-input name="games" type="number" v-model="form.games"></md-input>
        <span class="md-error" v-if="!$v.form.games.required"
          >Games is required</span
        >
      </md-field>
      <!-- <md-field>
        <label for="goals">Goals</label>
        <md-input name="goals" type="goals" v-model="form.goals"></md-input>
      </md-field> -->
      <md-datepicker :class="getValidationClass('dob')" v-model="form.dob">
        <label>Select D.O.B</label>
      </md-datepicker>
      <md-field>
        <label>Player photo</label>
        <md-file accept="image/*" @md-change="handleFile" />
      </md-field>
      <md-field :class="getValidationClass('position')">
        <label for="position">Position</label>
        <md-select v-model="form.position" name="position" id="position">
          <md-option
            v-for="position in positionOptionList"
            :value="position.value"
            :key="position.value"
            >{{ position.name }}</md-option
          >
        </md-select>
        <span class="md-error" v-if="!$v.form.position.required"
          >The players position is required</span
        >
      </md-field>
      <md-field :class="getValidationClass('teamId')">
        <label for="team">Team</label>
        <md-select v-model="form.teamId" name="team" id="team">
          <md-option
            v-for="team in teamsOptionList"
            :value="team.value"
            :key="team.value"
            >{{ team.name }}</md-option
          >
        </md-select>
        <span class="md-error" v-if="!$v.form.teamId.required"
          >The players team is required</span
        >
      </md-field>
      <md-field>
        <label for="status">Status</label>
        <md-select v-model="form.status" name="status" id="status">
          <md-option
            v-for="status in statusOptionList"
            :value="status.value"
            :key="status.value"
            >{{ status.name }}</md-option
          >
        </md-select>
      </md-field>
      <md-progress-spinner
        v-if="isCreating"
        md-mode="indeterminate"
      ></md-progress-spinner>
      <md-button v-else type="submit" class="md-primary" :disabled="isCreating"
        >Create player</md-button
      >
    </form>
  </div>
</template>

<script>
import { validationMixin } from "vuelidate";
import {
  required,
  numeric,
  minLength,
  maxLength,
  between,
} from "vuelidate/lib/validators";
import { STATUSES, POSITIONS } from "@/constants";
import validationMethods from "@/mixins/validationMethods";

export default {
  name: "NewPlayer",
  mixins: [validationMixin, validationMethods],
  data() {
    return {
      form: {
        name: "Baz",
        surname: "Luurman",
        height: 193,
        weight: 93,
        games: 2,
        goals: null,
        dob: null,
        teamId: null,
        position: null,
        img: null,
      },
      isCreating: false,
      imgFieldTouched: false,
    };
  },
  validations: {
    form: {
      name: {
        required,
        maxLength: maxLength(50),
      },
      surname: {
        required,
        maxLength: maxLength(50),
      },
      number: {
        required,
        maxLength: maxLength(2),
        numeric,
      },
      height: {
        required,
        between: between(100, 230),
        numeric,
      },
      weight: {
        required,
        minLength: minLength(2),
        numeric,
      },
      games: {
        required,
        numeric,
      },
      // goals: {
      //   required,
      //   numeric,
      // },
      position: {
        required,
      },
      dob: {
        required,
      },
      teamId: {
        required,
      },
    },
  },
  computed: {
    teamsOptionList() {
      return Object.entries(this.$store.getters["teams/all"]).map(([, v]) => {
        return {
          value: v._id,
          name: v.name,
        };
      });
    },
    statusOptionList() {
      return STATUSES.map((v) => {
        return {
          value: v,
          name: v,
        };
      });
    },
    positionOptionList() {
      return POSITIONS.map((v) => {
        return {
          value: v,
          name: v,
        };
      });
    },
  },
  methods: {
    handleFile(e) {
      this.form.img = e[0];
    },
    createPlayer() {
      console.log("create");
      this.isCreating = true;
      if (this.img) {
        this.$store
          .dispatch("players/uploadImage", this.form)
          .then(() => {
            this.isCreating = false;
            this.displaySnackbar({ message: "created player" });
            this.$router.push({ name: "PlayersList" });
          })
          .catch((err) => {
            console.log(err);
            this.isCreating = false;
          });
      } else {
        this.$store
          .dispatch("players/create", this.form)
          .then(() => {
            this.isCreating = false;
            this.displaySnackbar({ message: "created player" });
            this.$router.push({ name: "PlayersList" });
          })
          .catch((err) => {
            console.log(err);
            this.isCreating = false;
          });
      }
    },
  },
};
</script>

<style lang="scss" scoped></style>
