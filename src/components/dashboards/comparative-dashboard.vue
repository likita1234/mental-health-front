<template>
    <comparative-dashboard-skeleton v-if="isLoading" />
    <div v-else>
        <div class="card">
            <!-- Comparative Dashboard Table -->
            <div v-if="comparativeTableData.length" class="p-card">
                <comparative-dashboard-table :data="comparativeTableData" />
            </div>
            <!-- Charts  -->
            <div v-if="metricIds && metricIds.length > 0" class="flex flex-wrap">
                <!-- dataRequested props allows metricdata component to know that we are expecting a data -->
                <metric-data v-for="metric in metricIds" :metricId="metric.metricId" :key="metric.metricId"
                    dataRequested class="col-12" @metric-data-loaded="loadMetrics" />
            </div>
        </div>
    </div>
</template>

<script setup>
import ComparativeDashboardSkeleton from '../common/skeleton/comparative-dashboard.vue';
import MetricData from '@/components/metric/MetricData.vue'
import ComparativeDashboardTable from '@/components/charts/ComparativeDashboardTable.vue'

import { computed, ref, watch, onMounted } from 'vue';
import { storeToRefs } from 'pinia'
import { dashboardStore } from '@/stores'
import { getComparativeAnalysisDashboardTableData } from '@/utils/chart-helpers';
import AppError from '@/utils/app-error';

// Store states
const { dashboards, params } = storeToRefs(dashboardStore)

// Component states
const metricIds = ref([])
const comparativeMetrics = ref([])
const comparativeTableData = ref([])
const isLoading = ref(false)

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
    try {
        isLoading.value = true
        // load dashboards (which type of dashboard)
        params.value = { type: 'comparative' }
        await dashboardStore.fetchDashboards()
        // Load first dashboard by default
        if (dashboards.value.length > 0) {
            const firstDashboard = dashboards.value[0]
            await loadSelectedDashboard(firstDashboard)
        }
    } catch (error) {
        new AppError(400, error?.message ?? 'Failed to load Comparative Dashboard')
    } finally {
        isLoading.value = false
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