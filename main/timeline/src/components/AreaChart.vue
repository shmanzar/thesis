<template>
  <svg :viewBox="`0 0 ${width} ${height}`">

      <linearGradient id="myGradient" gradientUnits="userSpaceOnUse" x1="10" y1="350" x2="0" y2="150"><stop offset="0%" stop-color="#F2994B" stop-opacity = "80%"></stop><stop offset="15%" stop-color="#F2994B" ></stop><stop offset="30%" stop-color="#F28749"></stop><stop offset="70%" stop-color="#F28749"></stop><stop offset="95%" stop-color="#D9483B"></stop><stop offset="100%" stop-color="#BF2431" ></stop></linearGradient>

          <path
    :d="jobsArea"
    :data="jobsData"
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
      created() {
    d3.csv('./fred_nyc_fs_empl.csv')
      .then(data => {
        data.forEach(d => {
          d.jobs = +d["fs_emp"]
          d.year = new Date(d['DATE']);
        })
        console.log(data);
        this.jobsData = data;
        console.log(this.jobsData)

      });
  },
  components: {
    // XAxis,
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
            .domain(d3.extent(this.filteredDate, d => d.jobs))
            .range([this.height - this.margin, this.margin])
      }, 
      jobsArea() {
          const areaGenerator = d3.area()
            .x(d => this.xScale(d.year))
            .y1(d => this.yScale(d.jobs))
            .y0(this.yScale(0))
            // .curve(d3.curveMonotoneX)
            console.log(this.filteredDate)
          return areaGenerator(this.filteredDate)
      },
      filteredDate() {
        const from = Date.parse('01 Jan 1990')
        const until = Date.parse('01 Mar 2021')
        return this.jobsData.filter(function(entry) {
          const time = entry.year
              return time >= from && time <= until
        })
      }
  },
  data() {
    return {
      margin: 50,
      width: 1400,
      height: 400,
      jobsData: [],
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
