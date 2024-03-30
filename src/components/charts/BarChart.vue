<template>
    <Bar id="my-bar-chart-id" :data="chartData" :options="barChartOptions" :style="{ 'min-height': '20rem' }" />
</template>

<script setup>
import { computed } from 'vue';
import { Bar } from 'vue-chartjs'
import { generateRandomColor } from '@/constants/color';

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
const barChartOptions = computed(() => {
    return {
        ...props.chartOptions,
        scales: {
            xAxes: [{
                gridLines: {
                    display: false, 
                },
                ticks: {
                    fontColor: 'black', 
                },
            }],
            yAxes: [{
                ticks: {
                    beginAtZero: true,
                    fontColor: 'black', 
                },
            }]
        },
    }
})

const chartData = computed(() => {
    const metricData = props.jsonData

    return {
        // metricData?.map(dataObj => dataObj.label)
        labels: props.groupBy,
        datasets: metricData?.map((dataObj, index) => {
            return {
                label: dataObj.label,
                backgroundColor: generateRandomColor(index),
                data: dataObj.count?.length ? dataObj.count : [dataObj.count]
            }
        })
    }
})
</script>