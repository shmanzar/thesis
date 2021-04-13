<template>
   <svg :height="height" :width="width">
          <path
    :d="case_countLine"
    :data="casesData"
    fill="none"
    stroke="black"
    stroke-width="3"

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
export default {
  name: 'Timeline',
  created() {
    d3.csv('./cases-by-day.csv')
      .then(data => {
        data.forEach(d => {
          d.cases = +d["CASE_COUNT"]
          d.year = new Date(d.date_of_interest);
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
          return d3.scaleTime()
            .domain(d3.extent(this.filteredDate, d => d.year))
            .range([this.margin, this.width - this.margin])
      },
      yScale() {
          return d3.scaleLinear()
            .domain(d3.extent(this.filteredDate, d => d.cases))
            .range([this.height - this.margin, this.margin])
      }, 
      case_countLine() {
          const lineGenerator = d3.line()
            .x(d => this.xScale(d.year))
            .y(d => this.yScale(d.cases))
            // .curve(d3.curveMonotoneX)
            console.log(this.filteredDate)
          return lineGenerator(this.filteredDate)
      },
      filteredDate() {
        const from = Date.parse('29 Feb 2020')
        const until = Date.parse('19 Mar 2020')
        return this.casesData.filter(function(entry) {
          const time = entry.year
              return time >= from && time <= until
        })
      }
  },
  data() {
    return {
      // points: [],
      // xVar: "sepal_length",
      // yVar: "petal_width",
      
      margin: 100,
      width: 1400,
      height: 500,
      casesData: [],
    }
  }
}
</script>

<style>
  body {
    /*padding: 0;*/
    /*margin: 0;*/
  }
  .Timeline {
    display: flex;
    flex-direction: column;
  }

  
  text {
    transition: fill-opacity 0.5s;
    font-size: 12pt;
    pointer-events: none;
  }
 
</style>
