<template>
  <div>
    <MdEmptyState
      :md-icon="icon"
      :md-label="label"
      :md-description="description"
    >
      <slot name="action"></slot>
    </MdEmptyState>
  </div>
</template>

<script>
export default {
  name: "EmptyState",
  props: {
    icon: {
      type: String,
    },
    label: {
      type: String,
    },
    description: {
      type: String,
    },
  },
};
</script>
