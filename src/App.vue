<template>
  <div id="app" class="app">
    <router-view />
    <SnackBar />
  </div>
</template>
<script>
export default {
  name: "App",
};
</script>

<style lang="scss">
.app {
  height: 100vh;
}
</style>
