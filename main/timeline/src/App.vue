<template>
<div class='App'>
  <div class="header">
    <!--<h2>Chart of COVID19 cases</h2>-->
  </div>

  <Timeline />
  
  <el-divider></el-divider>
<!--  <div class="maps">-->

    <el-card>
      <h2>timeline here</h2>
<TimelineBar />

    </el-card>
<!--        <el-card>-->
<!--<h2>Pop ups here</h2>-->
<!--    </el-card>-->
<!--  </div>-->
</div>

</template>

<script>
// import * as d3 from "d3";
import TimelineBar from './components/timeline-bar.vue';
import Timeline from './components/timeline-chart.vue';




export default {
  name: 'App',
  created() {

  },
  components: {
    TimelineBar,
    Timeline
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
  }
  .App {
    display: flex;
    flex-direction: column;
  }
  .header {
    margin: 50px;
    display: flex;
  }
  .legend {
    margin: 10px;
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

 
