<template>
    <Line id="my-line-chart-id" :data="chartData" :options="chartOptions" :style="{ 'min-height': '20rem' }" />
</template>

<script setup>
import { computed } from 'vue';

import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
} from 'chart.js'
import { Line } from 'vue-chartjs'

import { generateRandomColors } from '@/constants/color';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
)

const props = defineProps({
    chartOptions: {
        type: Object,
        required: true
    },
    jsonData: {
        type: Object,
    },
    groupBy: {
        type: Array
    }
})

// Computed properties
const chartData = computed(() => {
    const metricData = props.jsonData
    // background colors
    let bgColors = generateRandomColors(metricData?.length)
    return {
        labels: metricData?.map(dataObj => dataObj.label),
        datasets: [{
            label: props.groupBy,
            backgroundColor: bgColors,
            data: metricData?.map(dataObj => dataObj.count),
        }]
    }
})
</script>