<template>
    <div class="layout-dashboard">
        <!-- Main WHO-5 Dashboard -->
        <div class="col-12 h-full">
            <div class="card sale-graph">
                <div class="card-header">
                    <h4>{{ metricData?.title }}</h4>
                </div>
                <div class="overview-chart">
                    <base-chart :type="chartType" :groupBy="defaultGroupings" :jsonData="jsonData" />
                </div>
            </div>
        </div>
    </div>
</template>

<!-- This dashboard is specially for WHO-5 only so we will need to hard code the metric id here while fetching its details -->

<script setup>
import { ref, onMounted, computed } from 'vue';
import { metricStore } from '@/stores'

// Here we will hardcode the metricId for WHO-5
const metricId = ref("65feedbbd213a25a0c31e2ba")
const metricData = ref(null)

// Computed properties
const chartType = computed(() => {
    return metricData.value?.chartType
})

const defaultGroupings = computed(() => {
    return metricData.value?.metricData?.data?.labels ?? []
})

const jsonData = computed(() => {
    return metricData.value?.metricData?.data?.data ?? []
})

onMounted(() => {
    loadMetricData()
})

// Actions
const loadMetricData = async () => {
    metricData.value = await metricStore.getMetricData(metricId.value)
}
</script>