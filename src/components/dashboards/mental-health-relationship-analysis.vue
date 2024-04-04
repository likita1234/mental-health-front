<!-- By Default we will search for a relationship dashboard and load the first one if it exists -->
<script setup>
import PlotyHeatmap from '@/components/plugins/ploty-heatmap.vue'

import { ref, onMounted, computed, watch } from 'vue';
import { storeToRefs } from 'pinia'

import { dashboardStore } from '@/stores'
import { convertRatingsDataToObject } from '@/utils/chart-helpers'
import { correlationMatrix, generateHypothesisAnalysis } from '@/utils/data-analysis'
import { DashboardType } from '@/constants'

// Store states
const { dashboards, params } = storeToRefs(dashboardStore)

// Component states
const dashboardData = ref(null)
const datasets = ref([])

// Computed properties
const convertedDashboardData = computed(() => {
    return dashboardData.value?.map(dashboard => {
        return {
            title: dashboard.title,
            data: convertRatingsDataToObject(dashboard.metricData?.data)
        }
    })
})

watch(() => convertedDashboardData.value, () => {
    if (convertedDashboardData.value && convertedDashboardData.value.length > 0) {
        // calculate correlations
        generateCorrelation()
    }
})


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

// generate correlation matrix
const generateCorrelation = async () => {
    const titles = convertedDashboardData.value?.map(dataset => dataset.title)
    const datasetsArray = convertedDashboardData.value?.map(dataset => dataset.data)
    if (titles.length && datasetsArray.length) {
        const correlationData = correlationMatrix(datasetsArray)
        datasets.value = titles.map((title, index) => ({
            title: title,
            data: correlationData[index].map(value => parseFloat(value))
        }));
        // Once correlation have been calculated, make analysis of Hypothesis
        // params :- titles and first index of datasets.value
        const correlationDatasets = datasets.value[0]?.data
        // const sampleSize = datasetsArray[0]?.length
        const hypothesisData = await generateHypothesisAnalysis({ titles, correlationDatasets, sampleSize })
        console.log(hypothesisData) // create table for this
    }
}

</script>

<template>
    <div v-if="datasets && datasets.length > 0" class="card p-5">
        <ploty-heatmap :datasets="datasets" />
    </div>
    <div v-else class="h-20rem flex justify-content-center align-items-center">
        <h4 class="text-center"> Data not available for analysis</h4>
    </div>
</template>