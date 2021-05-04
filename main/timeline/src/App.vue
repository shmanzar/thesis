<template>
    <div class="App">
        <el-image src="hero-title.svg" alt=""></el-image>
        <el-image src="hero-subtitle.svg" alt=""></el-image>

        <el-container>
            <el-header>
                <el-image src="hero-subtitle.svg" alt=""></el-image>
            </el-header>
            <el-main>
                <el-image src="cases-pre.svg" alt=""></el-image>
                <p class="textbox">
                    The hospitality industry has always been a critical
                    component of New York City’s economic and cultural
                    significance, employing hundreds of thousands, attracting
                    millions of visitors who spend around $46 billion annually,
                    and contributing to its image as a cultural powerhouse. The
                    New York City restaurant industry accounted for about 1 in
                    12 private sector jobs and establishments citywide in 2019.
                    Most of the labour which the industry relies upon is largely
                    undocumented and therefore, unprotected. This labour is also
                    predominantly made up of minority populations with relative
                    lower average wages compared to the rest of the city.
                </p>
                <p class="textbox">
                    Similarly, labour employment in the restaurant industry also
                    grew at double the rate of total private sector employment.
                    In 2019, the city’s restaurant industry employed 317,800
                    jobs - relative to only a decade ago, when it had 120,000
                    jobs.
                </p>
                <AreaChart :filterData="filterJobsPre" />
                <!-- <AreaChart :filterData="filterJobsPost" /> -->

                <el-divider></el-divider>

                <el-image src="emp-post.svg" alt=""></el-image>
                <p class="textbox">
                    As the lockdown began, New York City’s restaurant industry
                    faced an unprecedented near-decimation in the daily
                    patronage it experienced. Fear of the virus, but also
                    general economic anxiety kept demand low for even those
                    restaurants which had pivoted quickly to a take-out and
                    delivery model. In fact, restaurants in neighbourhoods such
                    as Chinatown and Flushing had begun seeing declines since
                    the first news of the virus came in January 2020. It is also
                    then when the city first faced a worrying rise in the number
                    of anti-Asian violence - which would only exacerbate later
                    as the pandemic continued. Reports of famous establishments
                    facing an irrecoverable decline in business were coming long
                    before the lockdown began in March. Mass-cancellations, both
                    by the customers and the restaurants themselves had already
                    begun, even as the city and state governments mulled over
                    the decision to close restaurants for indoor dining.
                </p>
                <Timeline :filterData="filterCasesPre" />
                <!-- <Timeline :filterData="filterCasesPost" /> -->

                <el-divider></el-divider>
                <p class="textbox">
                    However, only once the lockdown entered its first month did
                    a clearer picture of the fallout arise. The industry faced a
                    crisis unlike any other in its history. Restaurants all
                    across the city shutdown, either temporarily or
                    indefinitely, and laid off the staff. Employment in the
                    restaurant industry had reached a new high in the end of
                    March 2020 at ~320,000 sharply declined to ~87,500 in April
                    2020 - wiping out at least 30 years of growth in jobs.
                </p>
                <AreaChart :filterData="filterJobsPost" />
                <el-divider></el-divider>
                <div class="emp-box">
                    <div class="text">
                        <p class="textbox">
                            Hispanics are the largest share of restaurant labour
                            at 44 percent and a higher share than among all
                            workers. Asians also represented a higher share of
                            restaurant workers than among all occupations
                            citywide, in contrast to either Whites or Blacks or
                            African Americans
                        </p>
                    </div>
                    <div class="chart"><StackedBar /></div>
                </div>
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
        <!-- <div class="block">
    <span class="demonstration">Default</span>
    <el-date-picker
      v-model="cases_date_post_new"
      type="date"
      placeholder="Pick a day">
    </el-date-picker>
  </div> -->
    </div>
</template>

<script>
import * as d3 from "d3";

import AreaChart from "./components/AreaChart.vue";
// import TimelineBar from './components/timeline-bar.vue';
import Timeline from "./components/timeline-chart.vue";
import StackedBar from "./components/StackedBar.vue";

export default {
    name: "App",
    created() {
        d3.csv("./fred_nyc_fs_empl.csv").then((data) => {
            data.forEach((d) => {
                d.jobs = +d["fs_emp"];
                d.year = new Date(d["DATE"]);
            });
            // console.log(data);
            this.jobsData = data;
            // console.log(this.jobsData)

            d3.csv("./cases-by-day.csv").then((data) => {
                data.forEach((d) => {
                    d.cases = +d["CASE_COUNT"];
                    d.year = new Date(d.date_of_interest);
                });
                // console.log(data);
                this.casesData = data;
                // console.log(this.casesData)
            });

            //               d3.csv('./race_empl.csv')
            // .then(data => {
            //   data.forEach(d => {
            //     // d.race = d["race"]
            //     // d.emp_type = d["emp_type"]
            //    d.tot_emp = +d["emp"]
            //   })
            //   console.log(data);
            //   this.empData = data;
            //   console.log(this.empData)
            //    this.subgroups =  d3.map(data, function(d){return(d.race)})
            //    this.groups = d3.map(data, function(d){return(d.emp_type)})
            //            console.log(this.subgroups, this.groups)

            // });
        });
    },
    components: {
        // TimelineBar,
        Timeline,
        AreaChart,
        StackedBar,
    },
    data() {
        return {
            jobsData: [],
            casesData: [],
            // empData: [],
            // subgroups: [],
            // groups: [],
            jobs_date_pre: Date.parse("01 Jan 1990"),
            jobs_date_post: Date.parse("01 Mar 2020"),
            jobs_date_post_new: Date.parse("01 Mar 2021"),
            cases_date_pre: Date.parse("29 Feb 2020"),
            cases_date_post: Date.parse("19 Mar 2020"),
            cases_date_post_new: Date.parse("30 Mar 2021"),
        };
    },
    mounted() {},
    computed: {
        filterJobsPre() {
            const from = this.jobs_date_pre;
            const until = this.jobs_date_post;
            return this.jobsData.filter(function (entry) {
                const time = entry.year;
                return time >= from && time <= until;
            });
        },
        filterJobsPost() {
            const from = this.jobs_date_pre;
            const until = this.jobs_date_post_new;
            return this.jobsData.filter(function (entry) {
                const time = entry.year;
                return time >= from && time <= until;
            });
        },
        filterCasesPre() {
            const from = this.cases_date_pre;
            const until = this.cases_date_post;
            return this.casesData.filter(function (entry) {
                const time = entry.year;
                return time >= from && time <= until;
            });
        },
        filterCasesPost() {
            const from = this.cases_date_pre;
            const until = this.cases_date_post_new;
            return this.casesData.filter(function (entry) {
                const time = entry.year;
                return time >= from && time <= until;
            });
        },
    },
    methods: {},
};
</script>

<style>
@import url("https://use.typekit.net/kgv5xxb.css");

body {
    padding: 0;
    margin: 1.5em;
    /* background-color: black; */
    font-family: "Helvetica Neue";
    color: floralwhite;
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
p {
    /* margin: 7rem; */
    /* padding: 1rem; */
    /* line-height: 1.5625em; */
    line-height: 1.6;
    text-shadow: 1px 1px 1px rgba(0, 0, 0, 0.004);
    /* letter-spacing: -0.025rem; */
    /* font-size: 18px; */
    font-size: 1.155rem;
    /* font-size: 1.7em; */
    /* margin: 1rem 35rem 8rem 5rem; */
    background-color: rgba(126, 132, 138, 0.205);
    border-radius: 10px;
    font-family: agenda, sans-serif;
    font-weight: 400;
    font-style: normal;
}

.textbox {
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

.emp-box {
    display: grid;
    grid-template-columns: 0.5fr 1fr;
    grid-template-rows: 1fr 1fr;
    gap: 0px 0px;
    grid-template-areas:
        "text chart"
        ". chart";
}
.emp-box .chart {
    grid-area: chart;
}
.emp-box .text {
    grid-area: text;
}
</style>

 
