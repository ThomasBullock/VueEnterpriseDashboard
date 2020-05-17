<template>
  <div>
    <h1>Success</h1>
  </div>
</template>

<script>
export default {
  name: "Google",
  computed: {
    token() {
      return this.$route.query.token;
    }
  },
  mounted() {
    this.$store.commit("users/SET_TOKEN", this.token);
    this.$router.push("/");
  }
};
</script>

<style lang="scss" scoped>
</style>