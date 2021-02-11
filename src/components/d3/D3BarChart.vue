<template>
  <div id="container" class="svg-container" align="center">
    <h1>{{ title }}</h1>
    <svg v-if="redrawToggle === true" :width="svgWidth" :height="svgHeight">
      <g :style="{ transform: translateGroup }">
        <g v-if="graphType === 'bar'">
          <rect
            v-for="item in rawData"
            class="bar-positive"
            :key="item[xKey]"
            :x="scaleX(item[xKey])"
            :y="scaleY(item[yKey])"
            :width="scaleX.bandwidth()"
            :height="dimensions.height - scaleY(item[yKey])"
          />
        </g>
        <g v-else-if="graphType === 'scatter'">
          <circle
            v-for="item in rawData"
            :key="item[xKey]"
            :cx="scaleX(item[xKey])"
            :cy="scaleY(item[yKey])"
            r="5"
          />
          <d3-line :dataSet="lineData" curve="curveCardinal" />
        </g>
        <g class="y axis" v-axis:y="scaleY" />
        <g
          class="x axis"
          v-axis:x="scaleX"
          :style="{ transform: translateXAxis }"
        />
      </g>
      <g />
    </svg>
  </div>
</template>

<script>
import * as d3 from "d3";
import { scaleLinear, scaleBand } from "d3-scale";
import { max, min } from "d3-array";
// import { selectAll } from 'd3-selection';
import D3Line from "./D3Line";
// import { transition } from "d3-transition";

export default {
  name: "BarChart",
  props: {
    graphType: {
      type: String,
      default: "scatter",
    },
    rawData: {
      type: Array,
    },
    margins: {
      type: Object,
    },
    dimensions: {
      type: Object,
    },
    title: String,
    xKey: String,
    yKey: String,
    data: Array,
  },
  components: {
    D3Line,
  },
  mounted() {
    const data = this.rawData.map((item) => {
      console.log(item);
      const obj = {
        name: item.name,
        height: parseFloat(item.height),
      };
      return obj;
    });
    console.log(data);
    this.dataSet = data;
  },
  data: () => ({
    dataSet: null,
    redrawToggle: true,
  }),
  directives: {
    axis(el, binding) {
      const axis = binding.arg;
      const axisMethod = { x: "axisBottom", y: "axisLeft" }[axis];
      const methodArg = binding.value;
      console.log(binding, axisMethod, methodArg);
      if (axisMethod == "axisBottom") {
        d3.select(el)
          .call(d3[axisMethod](methodArg))
          .selectAll("text")
          .attr("y", "10")
          .attr("x", "-5")
          .attr("text-anchor", "end")
          .attr("transform", "rotate(-40)");
      } else {
        d3.select(el).call(d3[axisMethod](methodArg));
      }
    },
  },
  methods: {
    // AnimateLoad() {
    //   selectAll('rect')
    //     .data(this.data)
    //     .transition()
    //     .delay((d, i) => {
    //       return i * 150
    //     })
    //     .duration(1000)
    //     .attr('y', d => {
    //       return this.yScale(d[this.yKey])
    //     })
    //     .attr('height', d => {
    //       return this.svgHeight - this.yScale(d[this.yKey])
    //     })
    // },
    // AddResizeListener() {
    //   // redraw the chart 300ms after the window has been resized
    //   window.addEventListener('resize', () => {
    //     this.$data.redrawToggle = false
    //     setTimeout(() => {
    //       this.$data.redrawToggle = true
    //       this.$data.svgWidth =
    //         document.getElementById('container').offsetWidth * 0.75
    //       this.AnimateLoad()
    //     }, 300)
    //   })
    // }
  },
  computed: {
    dataMax() {
      return max(this.rawData, (d) => {
        return d[this.yKey];
      });
    },
    dataMin() {
      return min(this.rawData, (d) => {
        return d[this.yKey];
      });
    },
    svgWidth() {
      return this.dimensions.width + this.margins.left + this.margins.right;
    },
    svgHeight() {
      return this.dimensions.height + this.margins.top + this.margins.bottom;
    },
    translateGroup() {
      return `translate(${this.margins.left}px, ${this.margins.top}px)`;
    },
    translateXAxis() {
      return `translate(0, ${this.dimensions.height}px)`;
    },
    scaleX() {
      return scaleBand()
        .domain(this.rawData.map((d) => d.name))
        .range([0, this.dimensions.width])
        .paddingInner(0.3)
        .paddingOuter(0.3);
    },
    scaleY() {
      return scaleLinear()
        .domain([0, this.dataMax])
        .range([this.dimensions.height, 0]);
    },
    lineData() {
      return this.rawData.reduce((acc, next, i, arr) => {
        // [[scaleX(rawData[i][xKey]), scaleY(rawData[i][yKey])], [scaleX(rawData[i + 1][xKey]), scaleY(rawData[i + 1][yKey])]]
        if (i < arr.length) {
          const x = this.scaleX(next[this.xKey]);
          const y = this.scaleY(next[this.yKey]);
          console.log(x, y);
          acc.push([x, y]);
        }
        return acc;
      }, []);
    },
  },
};
</script>

<style scoped lang="scss">
.bar-positive {
  fill: steelblue;
  transition: r 0.2s ease-in-out;
}

.bar-positive:hover {
  fill: brown;
}

.svg-container {
  display: inline-block;
  position: relative;
  width: 100%;
  padding-bottom: 1%;
  vertical-align: top;
  overflow: hidden;
}
</style>
