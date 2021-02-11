<template>
  <path :d="_d" stroke-width="3" :stroke="color"></path>
</template>

<script>
import * as d3 from 'd3-shape';

export default {
  data() {
    return {};
  },
  props: {
    dataSet: {
      type: Array,
      default() {
        return [[12, 50], [40, 70], [50, 10], [80, 30], [143, 90], [180, 20]];
      }
    },
    xGetter: {
      type: Function,
      default: v => v[0]
    },
    yGetter: {
      type: Function,
      default: v => v[1]
    },
    curve: {
      type: String,
      default: 'curveLinear'
    },
    color: {
      type: String,
      default: '#333333'
    }
  },
  computed: {
    _d() {
      return d3
        .line()
        .curve(this.curveFunc)
        .x(this.xGetter)
        .y(this.yGetter)(this.dataSet);
    },
    curveFunc() {
      return d3[this.curve];
    }
  }
};
</script>

<style scoped lang="scss">
path {
  fill: none;
  /* stroke: red; */
}
</style>
