<!-- By Default we will search for a relationship dashboard and load the first one if it exists -->
<script setup>
import { ref, onMounted } from 'vue';
import { storeToRefs } from 'pinia'

import { dashboardStore } from '@/stores'
import { DashboardType } from '@/constants'

// Store states
const { dashboards, params } = storeToRefs(dashboardStore)

// Component states
const dashboardData = ref(null)

onMounted(() => {
    loadRelationshipDashboardId()
})

// Load dashboards and fetch the id of the first relationship dashboard
const loadRelationshipDashboardId = async () => {
    // Set params for type
    params.value = { type: DashboardType.RELATIONSHIP }
    // Load dashboards with type relationship
    await dashboardStore.fetchDashboards()
    // Fetch the dashboardId of first one and fetch its dashboard data
    const dashboardId = dashboards.value[0]?._id
    // If it exists then load dashboard data
    if (dashboardId) {
        await loadDashboardData(dashboardId)
    }
}

// load dashboard data
const loadDashboardData = async (dashboardId) => {
    dashboardData.value = await dashboardStore.getDashboardData(dashboardId)
}

</script>

<template>
    <div>
        {{ dashboardData }}
    </div>
</template>