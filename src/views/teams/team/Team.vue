<template>
  <div class="team">
    <PageHeader
      :title="team.name"
      :linkAction="{ linkName: 'EditTeam', linkText: 'Edit' }"
    />

    <div v-if="playersIsLoaded">
      <md-table
        v-model="players"
        :md-sort.sync="currentSort"
        :md-sort-order.sync="currentSortOrder"
        :md-sort-fn="customSort"
        md-card
      >
        <md-table-toolbar>
          <h1 class="md-title">Player List</h1>
        </md-table-toolbar>

        <md-table-row slot="md-table-row" slot-scope="{ item }">
          <md-table-cell md-label="Number" md-numeric md-sort-by="number">{{
            item.number
          }}</md-table-cell>
          <md-table-cell md-label="Name" md-sort-by="surname">{{
            item.name + item.surname
          }}</md-table-cell>
          <md-table-cell md-label="Height" md-sort-by="height">{{
            item.height
          }}</md-table-cell>
          <md-table-cell md-label="Games" md-sort-by="games">{{
            item.games
          }}</md-table-cell>
          <md-table-cell md-label="Status" md-sort-by="status">{{
            item.status
          }}</md-table-cell>
        </md-table-row>
      </md-table>
    </div>
    <div v-else class="spinner-wrapper">
      <md-progress-spinner md-mode="indeterminate"></md-progress-spinner>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import PageHeader from "@/components/common/PageHeader";
// import { mapGetters } from "vuex";

// __v: 0;
// _id: "5eb8765c563efc02ae16920d";
// dob: "1993-09-14T14:00:00.000Z";
// games: 140;
// goals: 191;
// height: 193;
// imgPublicId: "vue-dash/bzvtbivosbxhedi9lmua";
// imgUrl: "http://res.cloudinary.com/birdnerd/image/upload/v1589147227/vue-dash/bzvtbivosbxhedi9lmua.webp";
// name: "Tom";
// number: 27;
// position: "Forward";
// status: "Available";
// surname: "Lynch";
// teamId: "5eb67adcc56bb4205ec10422";

export default {
  name: "Team",
  props: {
    team: {
      type: Object,
      required: true,
    },
    teamId: {
      type: String,
      required: true,
    },
  },
  components: {
    PageHeader,
  },

  data() {
    return {
      currentSort: "surname",
      currentSortOrder: "asc",
      players: null,
    };
  },

  computed: {
    ...mapGetters("players", ["playersIsLoaded"]),
  },

  methods: {
    customSort(value) {
      return value.sort((a, b) => {
        const numeric = typeof a[sortBy] === "number";

        const sortBy = this.currentSort;

        const aStr = a[sortBy].toString();
        const bStr = b[sortBy].toString();

        if (this.currentSortOrder === "desc") {
          return aStr.localeCompare(bStr, { numeric: numeric });
        }

        return bStr.localeCompare(aStr, { numeric: numeric });
      });
    },
  },
  created() {
    console.log("created");
    if (!this.playersIsLoaded) {
      this.$store.dispatch("players/getAll").then(() => {
        this.players = this.$store.getters["players/playerByTeamId"](
          this.team._id
        );
      });
    }
  },
  watch: {
    "$route.path": {
      handler(newValue, oldValue) {
        console.log(newValue, oldValue);
      },
    },
    teamId: {
      immediate: true,
      handler(newValue, oldValue) {
        console.log(newValue, oldValue);
        if (newValue !== oldValue) {
          this.players = this.$store.getters["players/playerByTeamId"](
            this.team._id
          );
        }
      },
    },
  },
};
</script>

<style lang="scss" scoped></style>
