<template>
  <div class="team">
    <PageHeader
      :title="team.name"
      :linkAction="{ linkName: 'EditTeam', linkText: 'Edit' }"
    />
  </div>
</template>

<script>
import PageHeader from "@/components/common/PageHeader";
// import { mapGetters } from "vuex";

export default {
  name: "Team",
  props: {
    team: {
      type: Object,
      required: true,
    },
  },
  components: {
    PageHeader,
  },

  computed: {
    players() {
      return this.$store.getters["players/playerByTeamId"](this.team._id);
    },
  },
};
</script>

<style lang="scss" scoped></style>
