<template>
    <div>
        <dashboard-selection-dropdown :type="'comparative'" @dashboard-selected="loadSelectedDashboard" class="" />
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

import { computed, ref, watch } from 'vue';
import { getComparativeAnalysisTableData } from '@/utils/chart-helpers';

// Component states
const metricIds = ref([])
const comparativeMetrics = ref([])
const comparativeTableData = ref(null)

// Keeps track of metrics data loaded by comparing it with the length of the loaded metrics 
const allMetricsLoaded = computed(() => {
    return metricIds.value?.length === comparativeMetrics.value?.length
})

// Watches over allMetricsLoaded so that it can trigger what to do next after all data is loaded
watch(() => allMetricsLoaded.value, () => {
    if (allMetricsLoaded.value) {
        comparativeTableData.value = getComparativeAnalysisTableData(comparativeMetrics.value)
    }
})

// Actions
const loadSelectedDashboard = async (dashboardDetails) => {
    // console.log(dashboardDetails)
    const { _id, title, description, metrics } = dashboardDetails
    metricIds.value = metrics
}

const loadMetrics = (metricData) => {
    comparativeMetrics.value.push(metricData)
}
</script>