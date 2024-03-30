<template>
    <div class="card">
        <div id="card-header" class="order-tabs">
            <h4 class="text-center">{{ title + ' (' + type + ')' }}</h4>
        </div>
        <div class="card-body">
            <!-- <Chart type="pie" :data="chartData" :options="chartOptions" class="w-full md:w-30rem" /> -->
        </div>

    </div>
</template>

<script setup>
import { onMounted, ref, computed } from 'vue';

import { metricStore } from '@/stores';
import { generateRandomColor } from '@/constants/color'

// Props
const props = defineProps({
    metricId: {
        type: String,
        required: true
    }
})

// Component states
const metricDetails = ref(null)

const chartData = ref(null)

// Computed properties
const title = computed(() => {
    return metricDetails.value?.title
})

const type = computed(() => {
    return metricDetails.value?.chartType
})

onMounted(async () => {
    await loadMetricDetails()

    loadChartDetails()
})

// Actions
const loadMetricDetails = async () => {
    metricDetails.value = await metricStore.getMetricData(props.metricId)
    console.log(metricDetails.value)
}

const loadChartDetails = async () => {
    chartData.value = await setChartData();
}

const setChartData = async () => {
    const metricData = metricDetails.value.metricData.data;
    // background colors
    let bgColors = []
    for (let i = 0; i < metricData?.length; i++) {
        bgColors.push(generateRandomColor())
    }
    return {
        labels: metricData?.map(dataObj => dataObj?.label),
        datasets: {
            data: metricData?.map(dataObj => dataObj?.count),
            backgroundColor: bgColors,
            hoverBackgroundColor: bgColors,
        }
    }
}

</script>