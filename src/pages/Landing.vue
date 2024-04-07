<script setup>
import LandingNavbar from './components/LandingNavbar.vue'
</script>

<template>
    <div class="limiter">
        <div class="w-10rem lg:w-15rem md:w-12rem m-3 absolute xs:relative">
            <div class="layout-topbar-logo">
                <img src="/images/logo/logo-transparent.png" alt="app-logo" class="app-logo w-full">
            </div>
        </div>
        <!-- NavigationBar -->
        <div class="flex flex-column justify-content-center gap-5 h-fit">
            <LandingNavbar />
            <div class="landing-container">
                <router-view></router-view>
            </div>
        </div>
    </div>
</template>