<template>
<div class='App'>
<el-image src="hero-title.svg" alt=""></el-image>
<el-image src="hero-subtitle.svg" alt=""></el-image>

  <!-- <div class="header"> -->
    <!--<h2>Chart of COVID19 cases</h2>-->
  <!-- </div> -->

  <Timeline />
  
  <el-divider></el-divider>
<!--  <div class="maps">-->

    <el-card>
      <!-- <h2>timeline here</h2> -->
<TimelineBar />

    </el-card>
    <AreaChart/>
  
<!--        <el-card>-->
<!--<h2>Pop ups here</h2>-->
<!--    </el-card>-->
<!--  </div>-->
</div>

</template>

<script>
import AreaChart from './components/AreaChart.vue';
// import * as d3 from "d3";
import TimelineBar from './components/timeline-bar.vue';
import Timeline from './components/timeline-chart.vue';




export default {
  name: 'App',
  created() {

  },
  components: {
    TimelineBar,
    Timeline,
    AreaChart
  },
  data() {
    return {

    }
  },
  mounted() {
 
  },
  computed: {

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

 
