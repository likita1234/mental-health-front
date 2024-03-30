<template>
    <div>
        {{ dashboard }}
    </div>
</template>

<!-- At the moment there is no way to identify default dashboard so we need to preset the exact dashboard id -->
<script setup>
import { onMounted, ref } from 'vue';

import { dashboardStore } from '@/stores'

// Component states
const dashboard = ref(null)

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