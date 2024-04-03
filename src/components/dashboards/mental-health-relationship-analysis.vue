<!-- By Default we will search for a relationship dashboard and load the first one if it exists -->
<script setup>
import { onMounted } from 'vue';
import { storeToRefs } from 'pinia'

import { dashboardStore } from '@/stores'
import { DashboardType } from '@/constants'

// Store states
const { dashboards, params } = storeToRefs(dashboardStore)

onMounted(() => {
    loadRelationshipDashboard()
})

const loadRelationshipDashboard = async () => {
    params.value = { type: DashboardType.RELATIONSHIP }
    // Load all dashboards with type relationship
    const existingDashboard = await dashboardStore.fetchDashboards()
    if (existingDashboard) {
        console.log(existingDashboard)
    }
}

</script>

<template>
    <div>
        
    </div>
</template>