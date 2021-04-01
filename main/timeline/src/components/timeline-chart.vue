<template>
   <svg :height="height" :width="width">
    <path
    :d="case_countLine"
    fill="none"
    stroke="black"
    />
    <XAxis 
      :xScale="xScale" 
      :yTranslate="height - margin"
    />
    <YAxis 
      :yScale="yScale"
      :xTranslate="margin"
    />
  </svg>  
</template>

<script>
import * as d3 from 'd3';
import XAxis from './timeline-XAxis.vue';
import YAxis from './timeline-YAxis.vue';

// var parseTime = d3.timeParse("%d-%b-%y");

export default {
  name: 'Timeline',
  created() {
    d3.csv('../cases-by-day.csv')
      .then(data => {
        data.forEach(d => {
          d.cases = +d["CASE_COUNT"]
          d.year = new Date(d.date_of_interest).toLocaleDateString("en-US");
        })
        console.log(data);
        this.casesData = data;
        console.log(this.casesData)

      });
  },
  components: {
    // LabeledPoint,
    XAxis,
    YAxis
  },
  computed: {
      xScale() {
          return d3.scaleLinear()
            .domain(d3.extent(this.casesData, d => d.year))
            .range([0, this.width - this.margin])
      },
      yScale() {
          return d3.scaleLinear()
            .domain(d3.extent(this.casesData, d => d.cases))
            .range([this.height - this.margin, 0])
      },
      case_countLine() {
          const lineGenerator = d3.line()
            .x(function(d) { return this.xScale(d.year)})
            // .x( this.xScale(d.year))
            .y(function(d) { return this.yScale(d.cases)});
          return lineGenerator(this.casesData);
      },
  },
  data() {
    return {
      // points: [],
      // xVar: "sepal_length",
      // yVar: "petal_width",
      margin: 100,
      width: 500,
      height: 300,
      casesData: [],
    }
  },
}
</script>

<style>
  body {
    padding: 0;
    margin: 0;
  }
  .App {
    display: flex;
    flex-direction: column;
  }
  .header {
    padding: 10px;
    display: flex;
  }
  .legend {
    margin: 10px;
  }
  .maps {
    display: flex;
    justify-content: space-around;
  }
  
  text {
    transition: fill-opacity 0.5s;
    font-size: 12pt;
    pointer-events: none;
  }
 
</style>
