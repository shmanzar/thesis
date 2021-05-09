<template>
    <svg :viewBox="`0 0 ${width} ${height}`">
        <linearGradient
            id="myGradient"
            gradientUnits="userSpaceOnUse"
            x1="10"
            y1="350"
            x2="0"
            y2="150"
        >
            <stop offset="0%" stop-color="#F2994B" stop-opacity="100%"></stop>
            <stop offset="15%" stop-color="#F2994B"></stop>
            <stop offset="30%" stop-color="#FF851B"></stop>
            <stop offset="70%" stop-color="#FF851B"></stop>
            <stop offset="95%" stop-color="#E3170A"></stop>
            <stop offset="100%" stop-color="#E3170A"></stop>
        </linearGradient>
        <!-- stroke="#FF851B" -->
        <path
            :d="case_countLine"
            :data="filterData"
            fill="none"
            stroke="url(#myGradient)"
            stroke-width="2.2"
            @mouseover="onStateSelected"
            @mouseout="onStateDeselected"
        />
        <!-- <div id="toolTip"></div> -->
        <!-- <XAxis 
      :xScale="xScale" 
      :yTranslate="height - margin"
    /> -->
        <YAxis :yScale="yScale" :xTranslate="margin" />
    </svg>
    <Tooltip :description="currentStateDescription" />
</template>

<script>
import * as d3 from "d3";

// import XAxis from './timeline-XAxis.vue';
import YAxis from "./timeline-YAxis.vue";
import Tooltip from "./Tooltip";

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
        Tooltip,
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

            // console.log(this.filterData);
            return lineGenerator(this.filterData);
        },
        currentStateDescription: function () {
            return "Date: " + this.currentState;
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
    mounted() {},
    updated() {
        // var tooltip = d3
        //     .select("#toolTip")
        //     .append("div")
        //     .style("color", "white");
        // d3.select("path").on("mouseover", function () {
        //     tooltip
        //         .html("")
        //         .append("img")
        //         .attr("class", "toolTip")
        //         .attr("width", 340)
        //         .attr("height", 100)
        //         .html(function (d) {
        //             return "Name: " + "<b>" + d.year + "</b>" + "<br/>";
        //         });
        // });
    },
    methods: {
        onStateSelected: function (case_countLine) {
            // this.currentState = this.filterData[0].year;
            this.currentState = case_countLine.target.attribute;

            console.log(this.currentState);
        },
        // eslint-disable-next-line no-unused-vars
        onStateDeselected: function (path) {
            this.currentState = undefined;
        },
    },

    data() {
        return {
            margin: 50,
            width: 1400,
            height: 400,
            currentState: undefined,
            // tooltip: d3
            //     .select("path")
            //     .append("div")
            //     .attr("class", "tooltip")
            //     .attr("id", "tooltip")
            //     .style("opacity", 0),
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
