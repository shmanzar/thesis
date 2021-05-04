<template>
    <svg :viewBox="`0 0 ${width} ${height}`">
        <path
            :d="case_countLine"
            :data="filterData"
            fill="none"
            stroke="#FF851B"
            stroke-width="2.2"
        />
        <!-- <XAxis 
      :xScale="xScale" 
      :yTranslate="height - margin"
    /> -->
        <YAxis :yScale="yScale" :xTranslate="margin" />
    </svg>
</template>

<script>
import * as d3 from "d3";
// import XAxis from './timeline-XAxis.vue';
import YAxis from "./timeline-YAxis.vue";
export default {
    name: "Timeline",
    props: {
        filterData: Array,
    },
    created() {
        // d3.csv('./cases-by-day.csv')
        //   .then(data => {
        //     data.forEach(d => {
        //       d.cases = +d["CASE_COUNT"]
        //       d.year = new Date(d.date_of_interest);
        //     })
        //     console.log(data);
        //     this.casesData = data;
        //     console.log(this.casesData)
        //   });
    },
    components: {
        // LabeledPoint,
        // XAxis,
        YAxis,
    },

    computed: {
        xScale() {
            return d3
                .scaleTime()
                .domain(d3.extent(this.filterData, (d) => d.year))
                .range([this.margin, this.width - this.margin]);
        },
        yScale() {
            return d3
                .scaleLinear()
                .domain(d3.extent(this.filterData, (d) => d.cases))
                .range([this.height - this.margin, this.margin]);
        },
        case_countLine() {
            const lineGenerator = d3
                .line()
                .x((d) => this.xScale(d.year))
                .y((d) => this.yScale(d.cases))
                .curve(d3.curveMonotoneX);
            // console.log(this.filterData)
            return lineGenerator(this.filterData);
        },
        // filteredDate() {
        //   const from = Date.parse('29 Feb 2020')
        //   const until = Date.parse('19 Mar 2020')
        //   return this.casesData.filter(function(entry) {
        //     const time = entry.year
        //         return time >= from && time <= until
        //   })
        // }
    },
    data() {
        return {
            margin: 50,
            width: 1400,
            height: 400,
            // casesData: [],
        };
    },
};
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
