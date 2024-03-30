<script setup>
import LandingNavbar from './components/LandingNavbar.vue'
</script>

<template>
    <div class="limiter">
        <div class="w-15rem m-3 absolute">
            <img src="/images/logo/logo-transparent.png" alt="app-logo" class="app-logo w-full">
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