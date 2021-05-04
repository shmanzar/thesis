<template>
    <div id="stacked-chart"></div>

    <XAxis :xScale="xScale" :yTranslate="height - margin" />
    <!-- <YAxis :yScale="yScale" :xTranslate="margin" /> -->
</template>

<script>
import * as d3 from "d3";
import XAxis from "./timeline-XAxis.vue";
// import YAxis from "./timeline-YAxis.vue";

export default {
    name: "StackedBar",
    data() {
        return {
            margin: 100,
            width: 500,
            height: 600,
            empData: [],
            subgroups: [],
            groups: [],
            stackedData: Object,
            // stackGen: [],
        };
    },
    created() {
        d3.csv("./race_empl_flat.csv").then((data) => {
            // console.log(data);
            data.forEach((d) => {
                d.emp_type = d["emp"];
                d.Hispanic = +d.Hispanic;
                d.White = +d.White;
                d.Asian = +d.Asian;
                d.African_American = +d.African_American;
                d.Other = +d.Other;
            });
            this.empData = data;
            console.log(this.empData);
            this.subgroups = this.empData.columns.slice(1);
            this.groups = d3.map(this.empData, function (d) {
                return d.emp;
            });
            // console.log(this.groups);

            console.log(this.subgroups);
            console.log(this.groups);

            // const sbars = this.empData;
        });
    },
    components: {
        XAxis,
        // YAxis,
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
                .range(d3.schemeTableau10);
        },
        // stackedData() {
        //     //  stackGen = d3.stack().keys(this.subgroups;)
        //     // console.log("test", this.stackedData);
        //     // console.log(this.stackedData);
        //     return d3.stack().keys(this.subgroups)(this.empData);
        // },
    },
    mounted() {
        d3.select("#stacked-chart")
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
        const vm = this;
        this.stackedData = d3.stack().keys(this.subgroups)(this.empData);
        const bubbleData = this.stackedData;
        console.log(bubbleData);

        const svg = d3
            .select(".stacks")
            .append("g")
            .selectAll("g")
            // Enter in the stack data = loop key per key = group per group
            .data(bubbleData)
            .enter()
            .append("g");

        svg.attr("fill", function (d) {
            return vm.colorScale(d.key);
        })
            .selectAll("rect")
            // enter a second time = loop subgroup per subgroup to add all rectangles
            .data(function (d) {
                return d;
            })
            .enter()
            .append("rect")
            .attr("x", function (d) {
                return vm.xScale(d.data.emp_type);
            })
            .attr("y", function (d) {
                return vm.yScale(d[1]);
            })
            .attr("height", function (d) {
                return vm.yScale(d[0]) - vm.yScale(d[1]);
            })
            .attr("width", vm.xScale.bandwidth());

        svg.append("g")
            .attr("transform", "translate(0," + vm.height + ")")
            .call(
                d3
                    .axisBottom(vm.xScale(bubbleData.data.emp_type))
                    .tickSizeOuter(0)
            );
    },
};
</script>

<style>
</style>