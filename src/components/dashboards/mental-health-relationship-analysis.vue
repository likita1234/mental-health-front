<!-- By Default we will search for a relationship dashboard and load the first one if it exists -->
<script setup>
import RelationshipSkeleton from '@/components/common/skeleton/relationship-dashboard.vue'
import PlotyHeatmap from '@/components/plugins/ploty-heatmap.vue'

import { ref, onMounted, computed, watch } from 'vue';
import { storeToRefs } from 'pinia'

import { dashboardStore } from '@/stores'
import { convertRatingsDataToObject } from '@/utils/chart-helpers'
import { correlationMatrix, generateHypothesisAnalysis } from '@/utils/data-analysis'
import { exportCSV } from '@/utils/csv-export'
import { DashboardType } from '@/constants'
import AppError from '@/utils/app-error';

// Store states
const { dashboards, params } = storeToRefs(dashboardStore)

// Component states
const dashboardData = ref(null)
const blockContents = ref([])
const datasets = ref([])
const hypothesisData = ref([])
const isLoading = ref(false)

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
    try {
        isLoading.value = true
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
    } catch (error) {
        new AppError(400, error?.message ?? 'Failed to load Mental Health Dashboard')
    } finally {
        isLoading.value = false
    }
}

// load dashboard data
const loadDashboardData = async (dashboardId) => {
    dashboardData.value = await dashboardStore.getDashboardData(dashboardId)
    loadBlockContents()
}

const loadBlockContents = () => {
    const allData = dashboardData.value
    blockContents.value[0] = {
        label: 'Total Respondents',
        total: allData[0]?.metricData?.totalCount,
        icon: 'pi-user',
        color: 'text-blue-500',
        bgColor: 'bg-blue-100'
    }
    blockContents.value[1] = {
        label: 'Independent Variables',
        total: allData?.length - 1,
        icon: 'pi-sitemap',
        color: 'text-orange-500',
        bgColor: 'bg-orange-100'
    }
    blockContents.value[2] = {
        label: 'Dependent Variables',
        icon: 'pi-angle-right',
        total: 1,
        color: 'text-cyan-500',
        bgColor: 'bg-cyan-100'
    }
}

const exportingCSV = () => {
    const title = convertedDashboardData.value?.map(dataset => dataset.title)
    const data = convertedDashboardData.value?.map(dataset => dataset.data)
    if (title.length && data.length) {
        exportCSV(title, data)
    }
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
        const sampleSize = datasetsArray[0]?.length
        // create table for this
        hypothesisData.value = await generateHypothesisAnalysis({ titles, correlationDatasets, sampleSize })
    }
}

</script>

<template>
    <relationship-skeleton v-if="isLoading" />
    <div v-else>
        <div>
            <div class="grid">
                <div v-for="block in blockContents" :key="block" class="col-12 md:col-4">
                    <div class="p-card p-3 border-round">
                        <div class="flex justify-content-between mb-3">
                            <div>
                                <span class="block text-500 font-medium mb-3">{{ block.label }}</span>
                                <div class="text-900 font-medium text-xl">{{ block.total }}</div>
                            </div>
                            <div class="flex align-items-center justify-content-center border-round"
                                :class="block.bgColor" style="width:2.5rem;height:2.5rem">
                                <i class="pi text-xl" :class="[block.icon, block.color]"></i>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div>
            <Button class="p-button-warning mx-2" label="Export CSV" @click="exportingCSV" />
        </div>
        <div v-if="datasets && datasets.length > 0" class="card p-5">
            <ploty-heatmap :datasets="datasets" />
        </div>
        <div v-else class="h-20rem flex justify-content-center align-items-center">
            <h4 class="text-center"> Data not available for analysis</h4>
        </div>
        <div v-if="hypothesisData && hypothesisData.length > 0" class="card">
            <DataTable ref="hypothesisDataDt" :value="hypothesisData">
                <template #header>
                    <div class="flex flex-wrap gap-2 align-items-center justify-content-between">
                        <h4 class="m-0">P Value Analysis based on Mental Health Score</h4>
                    </div>
                </template>
                <Column field="title" header="TITLE" style="width:10%" />
                <Column field="tValue" header="T VALUE" style="width:10%" />
                <Column field="pValue" header="P VALUE" style="width:10%" />
            </DataTable>
        </div>
    </div>
</template>