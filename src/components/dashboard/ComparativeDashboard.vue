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
import { ref } from 'vue';

// Component states
const metricIds = ref([])
const comparativeMetrics = ref([])

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