<template>
    <!-- Overall Dashboard -->
    <div class="card">
        <h4 class="text-center">{{ title }}</h4>
        <p class="text-center">{{ description }}</p>
        <Divider />
        <div v-if="metrics && metrics.length > 0" class="grid">
            <metric-data v-for="metric in metrics" :metricId="metric.metricId" :key="metric.metricId"
                class="col-12 md:col-6 xl:col-3" />
        </div>
    </div>
</template>

<!-- At the moment there is no way to identify default dashboard so we need to preset the exact dashboard id -->
<script setup>
import MetricData from '@/components/metric/MetricData.vue'
import { computed, onMounted, ref } from 'vue';

import { dashboardStore } from '@/stores'

// Component states
const dashboard = ref(null)

// Computed properties
const title = computed(() => {
    return dashboard.value?.title
})
const description = computed(() => {
    return dashboard.value?.description
})
const metrics = computed(() => {
    return dashboard.value?.metrics
})

onMounted(() => {
    loadDashboardDetails()
})

// Actions
const loadDashboardDetails = async () => {
    // Set dashboard id hardcoded for now
    const dashboardId = "65f77004da281f65e8a3952e";
    dashboard.value = await dashboardStore.getDashboardDetails(dashboardId)
}

</script>