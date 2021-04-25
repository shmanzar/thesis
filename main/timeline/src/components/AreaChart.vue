<template>
  <svg :viewBox="`0 0 ${width} ${height}`">

      <linearGradient id="myGradient" gradientUnits="userSpaceOnUse" x1="10" y1="350" x2="0" y2="150"><stop offset="0%" stop-color="#F2994B" stop-opacity = "80%"></stop><stop offset="15%" stop-color="#F2994B" ></stop><stop offset="30%" stop-color="#F28749"></stop><stop offset="70%" stop-color="#F28749"></stop><stop offset="95%" stop-color="#D9483B"></stop><stop offset="100%" stop-color="#BF2431" ></stop></linearGradient>

          <path
    :d="jobsArea"
    :data="filterData"
    fill="url(#myGradient)"
    stroke="#BF2431"
    stroke-width="2"

    />
    <!-- :transform="translate(0,yScale(jobsData[0].jobs))" -->
    <!-- <text 
    :transform ="translate(0,yScale(jobsData[0].jobs))"
    >{{jobsData[0].jobs}}</text> -->

    <!-- <XAxis 
      :xScale="xScale" 
      :yTranslate="height - margin"
    /> -->
    <YAxis 
      :yScale="yScale"
      :xTranslate="margin"
    />
  </svg>  
</template>

<script>

import * as d3 from 'd3';
// import XAxis from './timeline-XAxis.vue';
import YAxis from './timeline-YAxis.vue';

export default {
      name: 'AreaChart',
      props:{
        filterData: Array
      },
      created() {

  },
  components: {
    // XAxis,
    YAxis
  },
computed: {
      xScale() {
          return d3.scaleTime()
            .domain(d3.extent(this.filterData, d => d.year))
            .range([this.margin, this.width - this.margin])
      },
      yScale() {
          return d3.scaleLinear()
            .domain(d3.extent(this.filterData, d => d.jobs))
            .range([this.height - this.margin, this.margin])
      }, 
      jobsArea() {
          const areaGenerator = d3.area()
            .x(d => this.xScale(d.year))
            .y1(d => this.yScale(d.jobs))
            .y0(this.yScale(0))
            // .curve(d3.curveMonotoneX)
            console.log(this.filterData)
          return areaGenerator(this.filterData)
      },

  },
  data() {
    return {
      margin: 50,
      width: 1400,
      height: 400,
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
