<template>
    <Line id="my-line-chart-id" :data="chartData" :options="lineChartOptions" :style="{ 'min-height': '20rem' }" />
</template>

<script setup>
import { computed } from 'vue';
import { Line } from 'vue-chartjs'
import { generateRandomColors } from '@/constants/color';

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

const lineChartOptions = computed(() => {
    return {
        ...props.chartOptions,
        plugins: {
            datalabels: {
                color: 'black',
                anchor: 'end',
                align: 'right',
            }
        },
    }
})
</script>