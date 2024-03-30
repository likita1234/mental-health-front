<template>
    <Bar id="my-bar-chart-id" :data="chartData" :options="chartOptions" :style="{ 'min-height': '20rem' }" />
</template>

<script setup>
import { computed } from 'vue';
import { Bar } from 'vue-chartjs'
import {
    Chart as ChartJS,
    Title,
    Tooltip,
    BarElement,
    CategoryScale,
    LinearScale
} from 'chart.js'
import { generateRandomColors } from '@/constants/color';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip)

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

// Computed Properties
const chartData = computed(() => {
    const metricData = props.jsonData

    return {
        // metricData?.map(dataObj => dataObj.label)
        labels: props.groupBy,
        datasets: metricData?.map(dataObj => {
            return {
                label: dataObj.label,
                backgroundColor: generateRandomColors(),
                data: [dataObj.count]
            }
        })
    }
})
</script>