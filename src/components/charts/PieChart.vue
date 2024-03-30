<template>
    <Pie id="my-bar-chart-id" :data="chartData" :options="pieChartOptions" />
</template>

<script setup>
import { computed } from 'vue';
import { Pie } from 'vue-chartjs'
import { generateRandomColors } from '@/constants/color'

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
            data: metricData?.map(dataObj => dataObj.percent),
        }]
    }
})
const pieChartOptions = computed(() => {
    return {
        ...props.chartOptions,
        plugins: {
            datalabels: {
                color: 'white',
                align: 'end',
                formatter: function (value, context) {
                    return value + "%";
                }
            }
        },
    }
})
</script>