<template>
  <div class="account">
    <h1>My Account</h1>
    <h2>{{ userData.name }}</h2>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "Account",
  computed: {
    ...mapGetters("users", ["userData"])
  }
};
</script>

<style lang="scss" scoped>
.account {
  padding: $base-spacing;
}
</style>