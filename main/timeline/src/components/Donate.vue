<template>
    <el-image src="links-donate.png"> </el-image>
    <div id="link-list">
        <p class="textbox">One Fair Wage Emergency Fund</p>
        <p class="textbox">Restaurant Workers Relief Foundation</p>
        <p class="textbox">Eater List of NYC Relief Funds</p>
        <p class="textbox">World Central Kitchen</p>
    </div>
</template>

<script>
export default {
    name: "Donate",
};
</script>

<style scoped>
#link-list {
    display: grid;
    place-items: center;
    grid-template-columns: 1fr;
    grid-template-rows: 1fr 1fr 1fr 1fr;
    gap: 0px 0px;
    grid-template-areas:
        "."
        "."
        "."
        ".";
    text-align: center;
}
</style>;
