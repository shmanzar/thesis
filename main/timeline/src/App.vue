<template>
<div class='App'>
<el-image src="hero-title.svg" alt=""></el-image>
<el-image src="hero-subtitle.svg" alt=""></el-image>

<el-container>
  <el-header>
    <el-image src="hero-subtitle.svg" alt=""></el-image>

  </el-header>
  <el-main>
    <el-image src="cases-pre.svg" alt=""></el-image>


  <Timeline :filterData="filterCasesPre" />
  <Timeline :filterData="filterCasesPost" />
  
  <el-divider></el-divider>
   <!-- <div class="block">
    <span class="demonstration">Default</span>
    <el-date-picker
      v-model="cases_date_post_new"
      type="date"
      placeholder="Pick a day">
    </el-date-picker>
  </div> -->

    <el-image src="emp-post.svg" alt=""></el-image>

    <AreaChart :filterData="filterJobsPre"/>
    <AreaChart :filterData="filterJobsPost"/>

  <el-divider></el-divider>
  </el-main>
</el-container>
  <!-- <div class="header"> -->
    <!--<h2>Chart of COVID19 cases</h2>-->
  <!-- </div> -->

<!--  <div class="maps">-->

  <!-- <el-card>
<TimelineBar />

    </el-card> -->
<!--        <el-card>-->
<!--<h2>Pop ups here</h2>-->
<!--    </el-card>-->
<!--  </div>-->
</div>

</template>

<script>
import * as d3 from 'd3';

import AreaChart from './components/AreaChart.vue';
// import TimelineBar from './components/timeline-bar.vue';
import Timeline from './components/timeline-chart.vue';




export default {
  name: 'App',
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


  })},
  components: {
    // TimelineBar,
    Timeline,
    AreaChart
  },
  data() {
    return {
      jobsData: [],
      casesData: [],
      jobs_date_pre: Date.parse('01 Jan 1990'),
      jobs_date_post: Date.parse('01 Mar 2020'),
      jobs_date_post_new: Date.parse('01 Mar 2021'),
      cases_date_pre: Date.parse('29 Feb 2020'),
      cases_date_post: Date.parse('19 Mar 2020'),
      cases_date_post_new: Date.parse('30 Mar 2021')

    }
  },
  mounted() {
 
  },
  computed: {
          filterJobsPre() {
        const from = this.jobs_date_pre
        const until = this.jobs_date_post
        return this.jobsData.filter(function(entry) {
          const time = entry.year
              return time >= from && time <= until
        })

  },
            filterJobsPost() {
        const from = this.jobs_date_pre
        const until = this.jobs_date_post_new
        return this.jobsData.filter(function(entry) {
          const time = entry.year
              return time >= from && time <= until
        })

  },
        filterCasesPre() {
        const from = this.cases_date_pre
        const until = this.cases_date_post
        return this.casesData.filter(function(entry) {
          const time = entry.year
              return time >= from && time <= until
        })
      },
              filterCasesPost() {
        const from = this.cases_date_pre
        const until = this.cases_date_post_new
        return this.casesData.filter(function(entry) {
          const time = entry.year
              return time >= from && time <= until
        })
      }
      },
  methods: {

  }
}
</script>

<style>
  body {
    padding: 0;
    margin: 0;
    background-color: black;
  }
  .App {
    display: flex;
    flex-direction: column;
  }
  .header {
    margin: 50px;
    display: flex;
  }
 
  .maps {
    display: flex;
    justify-content: space-around;
  }
  #mapbox-container {
    height: 500px;
    width: 400px;
  }
  

</style>

 
