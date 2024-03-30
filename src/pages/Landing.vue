<script setup>
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import LandingNavbar from './components/LandingNavbar.vue'

const route = useRoute()

const isSurveyRoute = computed(() => {
    return route.name === 'survey-form'
})
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
                <div v-if="isSurveyRoute" class="flex justify-content-center">
                    <language-selection />
                </div>
                <router-view></router-view>
            </div>
        </div>
    </div>
</template>