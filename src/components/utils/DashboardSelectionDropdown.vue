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
watch(selectedDashboard, () => {
    emit('dashboard-selected', selectedDashboard.value)
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
        <BaseDropdown v-model="selectedDashboard" :label="'Start by selecting a dashboard'" :options="dashboards"
            optionLabel="title" optionValue="_id" placeholder="Select a dashboard" :showClear="false" />
    </div>
</template>