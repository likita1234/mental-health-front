<script setup>
import { ref, onMounted, watch } from 'vue'
import { storeToRefs } from 'pinia'

import { dashboardStore } from '@/stores'

const emit = defineEmits(['dashboard-selected'])

// Props
const props = defineProps({
    type: {
        type: String,
        default: 'normal'
    }
})

// Store states
const { dashboards, params } = storeToRefs(dashboardStore)

// Component States
const selectedDashboard = ref(null)

// Watchers for analysis of dashboard selection 
watch(() => selectedDashboard.value, () => {
    if (selectedDashboard.value) {
        // Get some dashboard details
        const dashboardDetails = dashboards.value.find(dashboard => dashboard._id === selectedDashboard.value)
        emit('dashboard-selected', dashboardDetails)
    }
})

onMounted(() => {
    loadDashboards()
})

// Actions
const loadDashboards = async () => {
    // On the basis of type props, load dashboards (which type of dashboard)
    params.value = { type: props.type }
    await dashboardStore.fetchDashboards()
}
</script>

<template>
    <div>
        <BaseDropdown v-model="selectedDashboard" :label="'Select a dashboard'" :options="dashboards"
            optionLabel="title" optionValue="_id" placeholder="Choose an option" :showClear="false" />
    </div>
</template>