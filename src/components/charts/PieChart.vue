<template>
    <Pie id="my-bar-chart-id" :data="chartData" :options="chartOptions" />
</template>

<script setup>
import { computed } from 'vue';
import { Pie } from 'vue-chartjs'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'

import { generateRandomColors } from '@/constants/color'

ChartJS.register(ArcElement, Tooltip, Legend)

const props = defineProps({
    chartOptions: {
        type: Object,
        required: true
    },
    jsonData: {
        type: Object,
        required: true
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
            backgroundColor: bgColors,
            data: metricData?.map(dataObj => dataObj.count),
        }]
    }
})
</script>