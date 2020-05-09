<template>
  <md-snackbar
    :md-position="position"
    :md-duration="isInfinity ? Infinity : snackBarStatus.duration"
    :md-active.sync="snackBarStatus.visible"
    @md-closed="handleReset"
  >
    <span v-if="snackBarStatus.visible">{{snackBarStatus.message}}</span>
    <md-button class="md-primary" @click="handleReset">Dismiss</md-button>
  </md-snackbar>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "SnackBar",
  props: {
    position: {
      type: String,
      default: "center"
    },
    isInfinity: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    ...mapGetters("ui", ["snackBarStatus"])
  },
  methods: {
    handleReset() {
      this.$store.commit("ui/RESET_SNACKBAR", { root: true });
    }
  }
};
</script>

<style lang="scss" scoped>
</style>