<template>
  <div class="account">
    <PageHeader title="User Account" />
    <h2>{{ userData.name }}</h2>
  </div>
</template>

<script>
import PageHeader from "@/components/common/PageHeader";
import { mapGetters } from "vuex";

export default {
  name: "Account",
  components: {
    PageHeader,
  },
  computed: {
    ...mapGetters("users", ["userData"]),
  },
};
</script>

<style lang="scss" scoped>
.account {
  padding: $large-spacing $large-spacing * 2;
}
</style>
