<template>
      <div class="block">
        <el-card 
          v-for= "(activity, index) in activities"
          :key="index"
          :timestamp="activity.timestamp">
          {{activity.content}}
        </el-card>
</div>
</template>

<script>
  export default {
    data() {
      return {
        activities: [{
          content: 'December 2020',
          timestamp: 'December 2020',
          popup: '',
        }, 
        {
          content: 'January 2020',
          timestamp: 'January 2020',
          popup: '',

        }, 
        {
          content: 'February 2020',
          timestamp: 'February 2020',
          popup: '',

        }, 
        {
          content: 'March 2020',
          timestamp: 'March 2020',
          popup: '',

        }]
      };
    }
  };
</script>
<style>
.block{
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-rows: 1fr;
  gap: 0px 0px;
  /*grid-template-areas:*/
  /*  ". . . . ";*/
  
}

</style>
