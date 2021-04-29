<template>
    <svg id="stacked-chart">

    <!-- <svg :viewBox="`0 0 ${width} ${height}`">
                  <rect
    :data="stackedData"
    :fill="colorScale"
    :x="xScale(groups)"
    :y="yScale(subgroups)"
    stroke="#BF2431"
    stroke-width="2"

    />
        <XAxis 
      :xScale="xScale" 
      :yTranslate="height - margin"
    />
    <YAxis 
      :yScale="yScale"
      :xTranslate="margin"
    />
    </svg> -->
</template>

<script>
import * as d3 from "d3";
// import XAxis from './timeline-XAxis.vue';
// import YAxis from './timeline-YAxis.vue';

export default {
    name: "StackedBar",
    // props: {
    //     empData: Array,
    //     subgroups: Array,
    //     groups: Array,
    // },
    data() {
        return {
            margin: 50,
            width: 1400,
            height: 400,
            empData: [],
            subgroups: [],
            groups: [],
        };
    },
    created() {
        d3.csv("./race_empl.csv").then((data) => {
            data.forEach((d) => {
                // d.race = d["race"]
                // d.emp_type = d["emp_type"]
                d.tot_emp = +d["emp"];
            });
            console.log(data);
            this.empData = data;
            console.log(this.empData);
            this.subgroups = data.columns.slice(1);
            this.groups = d3
                .map(data, function (d) {
                    return d.group;
                })
                .keys();

            console.log(this.subgroups, this.groups);
        });
    },
    components: {
        // XAxis,
        // YAxis
    },
    computed: {
        xScale() {
            return d3
                .scaleBand()
                .domain(this.groups)
                .range([0, this.width])
                .padding([0.2]);
        },
        yScale() {
            return d3.scaleLinear().domain([0, 100]).range([this.height, 0]);
        },
        colorScale() {
            return d3
                .scaleOrdinal()
                .domain(this.subgroups)
                .range(["#e41a1c", "#377eb8", "#4daf4a", "#4dag3a"]);
        },
        stackedData() {
            return d3.stack().keys(this.subgroups)(this.empData);
        },
        //   jobsArea() {
        //       const areaGenerator = d3.area()
        //         .x(d => this.xScale(d.year))
        //         .y1(d => this.yScale(d.jobs))
        //         .y0(this.yScale(0))
        //         // .curve(d3.curveMonotoneX)
        //         console.log(this.filterData)
        //       return areaGenerator(this.filterData)
        //   },
    },
    mounted() {
        d3.select("stacked-chart")
            .append("svg")
            .attr("width", this.width + this.margin + this.margin)
            .attr("height", this.height + this.margin + this.margin)
            .append("g")
            .attr("class", "stacks")
            .attr(
                "transform",
                "translate(" + this.margin + "," + this.margin + ")"
            );
    },
    updated() {
        const sbars = this.empData;
        const bars_stacked = d3
            .select(".stacks")
            .append("g")
            .selectAll("g")
            // Enter in the stack data = loop key per key = group per group
            .data(stackedData)
            .enter()
            .append("g")
            .attr("fill", function (d) {
                return colorScale(d.key);
            })
            .selectAll("rect")
            // enter a second time = loop subgroup per subgroup to add all rectangles
            .data(function (d) {
                return d;
            })
            .enter()
            .append("rect")
            .attr("x", function (d) {
                return xScale(d.data.group);
            })
            .attr("y", function (d) {
                return yScale(d[1]);
            })
            .attr("height", function (d) {
                return yScale(d[0]) - y(d[1]);
            })
            .attr("width", xScale.bandwidth());
    },
};
</script>

<style>
</style>