<template>
    <div class="card">
        <!-- <div class="flex justify-content-center">
            <dashboard-selection-dropdown :type="'comparative'" @dashboard-selected="loadSelectedDashboard" />
        </div> -->
        <!-- Comparative Dashboard Table -->
        <div v-if="comparativeTableData.length" class="p-card">
            <comparative-dashboard-table :data="comparativeTableData" />
        </div>
        <!-- Charts  -->
        <div v-if="metricIds && metricIds.length > 0" class="flex flex-wrap">
            <!-- dataRequested props allows metricdata component to know that we are expecting a data -->
            <metric-data v-for="metric in metricIds" :metricId="metric.metricId" :key="metric.metricId" dataRequested
                class="col-12" @metric-data-loaded="loadMetrics" />
        </div>
    </div>
</template>

<script setup>
// import DashboardSelectionDropdown from '@/components/common/dropdowns/dashboard-selection.vue'
import MetricData from '@/components/metric/MetricData.vue'
import ComparativeDashboardTable from '@/components/charts/ComparativeDashboardTable.vue'

import { computed, ref, watch, onMounted } from 'vue';
import { storeToRefs } from 'pinia'
import { dashboardStore } from '@/stores'
import { getComparativeAnalysisDashboardTableData } from '@/utils/chart-helpers';

// Store states
const { dashboards, params } = storeToRefs(dashboardStore)

// Component states
const metricIds = ref([])
const comparativeMetrics = ref([])
const comparativeTableData = ref([])

// Keeps track of metrics data loaded by comparing it with the length of the loaded metrics 
const allMetricsLoaded = computed(() => {
    return metricIds.value?.length === comparativeMetrics.value?.length
})

// Watches over allMetricsLoaded so that it can trigger what to do next after all data is loaded
watch(() => allMetricsLoaded.value, () => {
    if (allMetricsLoaded.value) {
        comparativeTableData.value = getComparativeAnalysisDashboardTableData(comparativeMetrics.value)
    }
})

onMounted(() => {
    loadComparativeDashboard()
})

// Actions
const loadComparativeDashboard = async () => {
    // load dashboards (which type of dashboard)
    params.value = { type: 'comparative' }
    await dashboardStore.fetchDashboards()
    // Load first dashboard by default
    if (dashboards.value.length > 0) {
        const firstDashboard = dashboards.value[0]
        loadSelectedDashboard(firstDashboard)
    }
}

const loadSelectedDashboard = async (dashboardDetails) => {
    const { _id, title, description, metrics } = dashboardDetails
    metricIds.value = metrics
}

const loadMetrics = (metricData) => {
    comparativeMetrics.value.push(metricData)
}
</script>