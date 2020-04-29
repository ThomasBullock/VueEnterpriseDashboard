<template>
  <div class="players">
    <nav>
      <router-link :to="{ name: 'PlayersList'}">Player List</router-link>
      <router-link :to="{ name: 'NewPlayer'}">Add Player</router-link>
    </nav>
    <main>
      <router-view></router-view>
    </main>
  </div>
</template>

<script>
export default {
  name: "Players"
};
</script>

<style lang="scss" scoped>
.players {
  padding: $base-spacing;
  display: flex;

  nav {
    flex: 1 1 25%;
    display: flex;
    flex-direction: column;
  }

  main {
    flex: 1 1 75%;
  }
}
</style>