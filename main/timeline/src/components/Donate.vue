<template>
    <el-image src="links-donate.png"> </el-image>
    <div id="link-list">
        <p class="linkbox">
            <a href="https://secure.actblue.com/donate/ofwfund" target="_blank"
                >One Fair Wage Emergency Fund</a
            >
        </p>
        <p class="linkbox">
            <a
                href="https://secure.restaurantworkerscf.org/np/clients/restaurantworkerscf/donation.jsp?campaign=2&forwardedFromSecureDomain=1&test=true"
                target="_blank"
                >Restaurant Workers Relief Foundation</a
            >
        </p>
        <p class="linkbox">
            <a
                href="https://ny.eater.com/2020/3/20/21188159/donate-to-nyc-staff-funds-coronavirus"
                target="_blank"
                >Eater's List of NYC Relief Funds</a
            >
        </p>
        <p class="linkbox">
            <a
                href="https://donate.wck.org/give/236738/#!/donation/checkout"
                target="_blank"
                >World Central Kitchen</a
            >
        </p>
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

.linkbox {
    width: 92.5%;
    max-width: 500px;
    padding: 1.25rem 1.75rem 1.5rem 1.75rem;
    /* margin-left: 5rem; */
    /* margin-bottom: 60rem; */
    /* z-index: 999; */
    border-radius: 10px;
    /* opacity: 0.925; */
    -webkit-filter: drop-shadow(0 2px 4px rgba(59, 59, 61, 0.4));
    filter: drop-shadow(0 2px 4px rgba(59, 59, 61, 0.4));
    /* background-color: rgba(126, 132, 138, 0.205); */
    background-color: rgba(126, 132, 138, 0.125);

    color: rgba(255, 250, 240, 0.9);
    border: 1px solid hsla(0, 0%, 43.9%, 0.2);
    -webkit-box-shadow: 0 6px 12px rgba(0, 0, 0, 0.5);
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.5);
}
a,
a:hover,
a:visited {
    color: rgba(255, 250, 240, 0.9);
    text-decoration: none;
    font-weight: 500;
}
</style>;
