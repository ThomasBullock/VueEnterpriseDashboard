<template>
  <div>
    <svg :view-box.camel="viewBox" preserveAspectRatio="xMidYMid meet">
      <g>
        <d3-line
          v-if="dataSet"
          :dataSet="dataSet"
          :xGetter="(v) => v.date"
          :yGetter="(v) => v.value"
        />
      </g>
      <d3-axis :scale="timeScale" position="bottom" />
    </svg>
  </div>
</template>

<script>
// import casesreport from './casesreport.csv'
import * as d3 from "d3";
import D3Line from "./D3Line";
import D3Axis from "./D3Axis";
import { scaleLinear, scaleTime } from "d3-scale";

export default {
  name: "LineChart",
  props: {
    axes: {
      type: Array,
      default: function() {
        return ["left", "bottom"];
      },
    },
    data: {
      type: Array,
      required: true,
    },
    layout: {
      type: Object,
    },
  },
  data() {
    return {
      rawData: [
        { date: "1951-01-01", value: 313.013970606384 },
        { date: "1952-01-01", value: 313.341970021567 },
        { date: "1953-01-01", value: 313.729969427623 },
        { date: "1954-01-01", value: 314.094968812929 },
        { date: "1955-01-01", value: 314.414967972057 },

        { date: "1956-01-01", value: 314.697967186718 },
        { date: "1957-01-01", value: 314.991966523988 },
        { date: "1958-01-01", value: 315.344965869144 },
        { date: "1959-01-01", value: 315.806965123165 },

        { date: "1960-01-01", value: 316.624964386756 },
        { date: "1961-01-01", value: 317.298963809512 },
        { date: "1962-01-01", value: 318.04396307864 },
        { date: "1963-01-01", value: 318.649962239874 },
        { date: "1964-01-01", value: 319.332961369615 },
      ],
      dataSet: null,
    };
  },
  components: {
    D3Line,
    D3Axis,
  },

  computed: {
    viewBox() {
      const outerWidth =
        this.layout.width + this.layout.marginLeft + this.layout.marginRight;
      const outerHeight =
        this.layout.height + this.layout.marginTop + this.layout.marginBottom;
      return "0 0 " + outerWidth + " " + outerHeight;
    },
    axisScale() {
      return scaleLinear()
        .domain([0, 100])
        .range([0, this.layout.width || 500]);
    },
    timeScale() {
      if (this.dataSet) {
        return scaleTime()
          .domain(
            d3.extent(this.dataSet, function(d) {
              return d.date;
            })
          )
          .range([0, this.layout.width]);
      } else {
        return null;
      }
    },
  },
  mounted() {
    // this.$axios.get('/static/casesreport.csv', d => {
    //   console.log(d)
    // })
    // d3.csv(
    //   'https://raw.githubusercontent.com/holtzy/data_to_viz/master/Example_dataset/3_TwoNumOrdered_comma.csv',
    //   d => {
    //     console.log(d)
    //   }
    // )
    const data = this.rawData.map((d) => {
      return {
        date: d3.timeParse("%Y-%m-%d")(d.date),
        value: d.value,
      };
    });
    this.dataSet = data;
  },
};
</script>

<style lang="scss" scoped></style>
