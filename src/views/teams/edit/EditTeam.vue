<template>
  <div>
    <PageHeader
      :title="'Edit ' + team.name"
      :linkAction="{ linkName: 'Team', linkText: 'Back' }"
    />
    <form>
      <md-field>
        <label for="name">Name</label>
        <md-input name="name" type="text" v-model="form.name"></md-input>
      </md-field>
      <span class="md-error" v-if="!$v.form.name.required"
        >Name is required</span
      >
      <md-field :class="getValidationClass('founded')">
        <label for="founded">Founded</label>
        <md-input
          name="founded"
          type="founded"
          v-model="form.founded"
        ></md-input>
      </md-field>
      <md-field>
        <label for="captain">Captain</label>
        <md-select v-model="form.captainId" name="captain" id="captain">
          <md-option
            v-for="player in players"
            :value="player._id"
            :key="player._id"
            >{{ player.name + " " + player.surname }}</md-option
          >
        </md-select>
        <!-- <span class="md-error" v-if="!$v.form.teamId.required"
          >The players team is required</span
        > -->
      </md-field>
      <md-field>
        <md-chips
          class="md-primary"
          md-input-type="number"
          md-check-duplicated
          v-model="form.premierships"
          :md-format="formatChip"
          md-placeholder="Select premiership years..."
        >
          <!-- <div class="md-helper-text">Default</div> -->
        </md-chips>
      </md-field>
    </form>
  </div>
</template>

<script>
import { validationMixin } from "vuelidate";
import { required, numeric, maxLength } from "vuelidate/lib/validators";
import PageHeader from "@/components/common/PageHeader";
import validationMethods from "@/mixins/validationMethods";

export default {
  name: "EditTeam",
  props: {
    team: {
      type: Object,
      required: true,
    },
  },
  components: {
    PageHeader,
  },
  mixins: [validationMixin, validationMethods],
  data() {
    return {
      form: {},
      isSending: false,
    };
  },
  validations: {
    form: {
      name: {
        required,
        maxLength: maxLength(50),
      },
      founded: {
        required,
        maxLength: maxLength(4),
        numeric,
      },
      premierships: {
        numeric,
      },
    },
  },
  computed: {
    players() {
      return this.$store.getters["players/playerByTeamId"](this.team._id);
    },
  },
  methods: {
    formatChip(str) {
      console.log(str);
      // let words = str.split(" ").filter((str) => str !== "");
      // // remove accents / diacritics
      // words = words.map((str) =>
      //   str.normalize("NFD").replace(/[\u0300-\u036f]/g, "")
      // );
      // // capitalize
      // words = words.map((str) => str[0].toUpperCase() + str.slice(1));
      return str; //words.join(" ");
    },
  },
  mounted() {
    // need to massage date data

    this.form = (() => {
      const team = this.team;
      return { ...team };
    })();

    // Temp
    if (!this.form.captainId) {
      this.form.captainId = null;
    }
    if (!this.form.premierships) {
      this.form.premierships = [];
    }
  },
};
</script>

<style lang="scss" scoped></style>
