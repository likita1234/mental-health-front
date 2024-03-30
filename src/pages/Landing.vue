<script setup>
import LandingNavbar from './components/LandingNavbar.vue'
</script>

<template>
    <div class="limiter">
        <div class="w-15rem m-3 absolute">
            <img src="/images/logo/logo-transparent.png" alt="app-logo" class="app-logo w-full">
        </div>
        <!-- NavigationBar -->
        <div class="flex flex-column justify-content-center gap-7 h-full">
            <LandingNavbar />
            <router-view></router-view>
        </div>
    </div>
</template>


<style lang="scss">
/*==================================================================
[ Main Container ]*/
.limiter {
    margin: 0 auto;
    // background: -webkit-linear-gradient(90deg, #359CA0, #38B98C);
    // background: -o-linear-gradient(90deg, #359CA0, #38B98C);
    // background: -moz-linear-gradient(90deg, #359CA0, #38B98C);
    // background: linear-gradient(90deg, #359CA0, #38B98C);

    background-image: url("images/overlay.png"), url("images/bg.jpg");
    background-repeat: repeat, no-repeat;
    background-size: auto, 100% 100%;
    height: 100vh;
    background-attachment: fixed;
    // overflow-y: scroll;
}
</style>