<template>
  <header class="page-header">
    <h1 class="page-heading">{{ title }}</h1>
    <router-link
      v-if="linkAction"
      class="sidebar-link"
      :to="{ name: linkAction.linkName }"
    >
      {{ linkAction.linkText }}
    </router-link>
  </header>
</template>

<script>
export default {
  name: "PageHeader",
  props: {
    title: {
      type: String,
      required: true,
    },
    linkAction: {
      type: Object,
    },
  },
};
</script>

<style lang="scss" scoped>
.page-header {
  display: flex;
  justify-content: space-between;
}
</style>
