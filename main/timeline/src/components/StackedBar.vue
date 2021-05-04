<template>
    <svg id="stacked-chart">
        <XAxis :xScale="xScale" :yTranslate="this.height + this.margin" />
    </svg>
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
            height: 500,
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
                .range([this.margin, this.width - this.margin])
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
            // .append("svg")
            .attr("width", this.width + this.margin + this.margin)
            .attr("height", this.height + this.margin + this.margin)
            .append("g")
            .attr("class", "stacks");
        // .attr(
        //     "transform",
        //     "translate(" + this.margin + "," + this.margin + ")"
        // );
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
            .attr("width", vm.xScale.bandwidth())
            .on("mouseover", function () {
                tooltip.style("display", null);
            })
            .on("mouseout", function () {
                tooltip.style("display", "none");
            })
            .on("mousemove", function (event) {
                var xPosition = d3.pointer(event)[0] - 15;
                var yPosition = d3.pointer(event)[1] - 25;
                var emp_val =
                    event.target.__data__[1] - event.target.__data__[0];
                console.log(event);
                tooltip.attr(
                    "transform",
                    "translate(" + xPosition + "," + yPosition + ")"
                );
                tooltip.select("text").text(emp_val + "%");
            });
        svg.append("text")
            .attr("x", (d) => vm.xScale(d.key))
            .attr("y", (d) => vm.yScale(d[0][0]))
            .attr("dx", 400)
            .attr("dy", "0em")
            .attr("fill", "white")
            .style("font-size", "0.80em")
            .text((d) => d.key);
        var tooltip = svg
            .append("g")
            .attr("class", "tooltip")
            .style("display", "none");

        tooltip
            .append("rect")
            .attr("width", 100)
            .attr("height", 20)
            // .attr("class", "tooltip");
            .attr("fill", "white")
            .style("opacity", 0.5);

        tooltip
            .append("text")
            .attr("x", 50)
            .attr("dy", "1em")
            .style("text-anchor", "middle")
            .attr("font-size", "10px")
            .attr("font-weight", "bold");

        // add SVG 'text' elements for labels
        //   svg.selectAll('text')
        //     .data(barData)
    },
};
</script>

<style>
.tooltip {
    width: 92.5%;
    max-width: 500px;
    padding: 1.25rem 1.75rem 1.5rem 1.75rem;
    margin-left: 5rem;
    /* margin-bottom: 60rem; */
    /* z-index: 999; */
    border-radius: 10px;
    /* opacity: 0.925; */
    -webkit-filter: drop-shadow(0 2px 4px rgba(59, 59, 61, 0.4));
    filter: drop-shadow(0 2px 4px rgba(59, 59, 61, 0.4));
    background-color: rgba(126, 132, 138, 0.205);
    color: #fff;
    border: 1px solid hsla(0, 0%, 43.9%, 0.2);
    -webkit-box-shadow: 0 6px 12px rgba(0, 0, 0, 0.5);
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.5);
}

.axis .x-axis {
    font-size: 44;
}
</style>