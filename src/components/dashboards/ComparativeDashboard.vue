<template>
    <div>
        <dashboard-selection-dropdown :type="'comparative'" @dashboard-selected="loadSelectedDashboard" />
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
import DashboardSelectionDropdown from '@/components/utils/DashboardSelectionDropdown.vue'
import MetricData from '@/components/metric/MetricData.vue'
import ComparativeDashboardTable from '@/components/charts/ComparativeDashboardTable.vue'

import { computed, ref, watch } from 'vue';
import { getComparativeAnalysisDashboardTableData } from '@/utils/chart-helpers';

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

// Actions
const loadSelectedDashboard = async (dashboardDetails) => {
    const { _id, title, description, metrics } = dashboardDetails
    metricIds.value = metrics
}

const loadMetrics = (metricData) => {
    comparativeMetrics.value.push(metricData)
}
</script>