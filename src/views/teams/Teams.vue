<template>
  <div class="teams">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: "Teams",
};
</script>

<style lang="scss" scoped>
.teams {
  padding: $large-spacing $large-spacing * 2;
}
</style>
