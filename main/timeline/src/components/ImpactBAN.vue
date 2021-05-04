<template>
    <el-carousel
        indicator-position="outside"
        height="700px"
        trigger="click"
        arrow="hover"
    >
        <el-carousel-item v-for="item in bans" :key="item">
            <h1>{{ item }}</h1>
            <p v-if="item === '71%'">
                of revenue lost compared to the previous year
            </p>
            <p v-if="item === '$2.8b'">
                in total revenue lost compared to the previous year
            </p>
            <p v-if="item === '40%'">of restaurants temporarily shutdown</p>
        </el-carousel-item>
    </el-carousel>
    <!-- <div class="grid-container">
        <div class="text1">71%</div>
        <div class="text2">$2.8b</div>
        <div class="text3">40%</div>
    </div> -->
</template>

<script>
export default {
    name: "ImpactBAN",
    data() {
        return {
            bans: ["71%", "$2.8b", "40%"],
        };
    },
};
</script>

<style>
/* .grid-container {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-template-rows: 1fr 1fr;
    gap: 0px 0px;
    grid-template-areas:
        "text1 text2 text3"
        "text1 text2 text3";
}
.text1 {
    grid-area: text1;
}
.text2 {
    grid-area: text2;
}
.text3 {
    grid-area: text3;
} */

.el-carousel__item h1 {
    color: #de3131;
    font-size: 120px;
    /* opacity: 0.9; */
    line-height: 300px;
    margin: 0;
    text-align: center;
}
.el-carousel__item p {
    /* color: aliceblue; */
    font-size: 54px;
    /* line-height: 300px; */
    margin: 0;
    text-align: center;
    background-color: black;
}
/* .el-carousel__item:nth-child(2n) { */
/* background-color: #99a9bf; */
/* } */

/* .el-carousel__item:nth-child(2n + 1) { */
/* background-color: #d3dce6; */
/* } */
</style>