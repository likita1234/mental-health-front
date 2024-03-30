<template>
    <div>
        <dashboard-selection-dropdown :type="'comparative'" @dashboard-selected="loadSelectedDashboard" class="" />
        <!-- Charts  -->
        <div v-if="metricIds && metricIds.length > 0" class="flex flex-wrap">
            <metric-data v-for="metric in metricIds" :metricId="metric.metricId" :key="metric.metricId" class="col-12"/>
        </div>
    </div>
</template>

<script setup>
import DashboardSelectionDropdown from '@/components/utils/DashboardSelectionDropdown.vue'
import MetricData from '@/components/metric/MetricData.vue'
import { ref } from 'vue';


// Component states
const metricIds = ref([])

// Actions
const loadSelectedDashboard = async (dashboardDetails) => {
    // console.log(dashboardDetails)
    const { _id, title, description, metrics } = dashboardDetails
    metricIds.value = metrics
}
</script>