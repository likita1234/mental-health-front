<template>
    <Bar id="my-bar-chart-id" :data="chartData" :options="barChartOptions" :style="{ 'min-height': '20rem' }" />
</template>

<script setup>
import { computed } from 'vue';
import { Bar } from 'vue-chartjs'

import { ChartType } from '@/constants';
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
    },
    type: {
        type: String,
        required: true
    }
})

// Computed Properties
const barChartOptions = computed(() => {
    return {
        ...props.chartOptions,
        plugins: {
            legend: {
                display: false
            },
            datalabels: {
                color: 'black',
                anchor: 'end',
                align: 'top',
                formatter: function (value, context) {
                    return value + "%";
                }
            },
        }
    }
})

const chartData = computed(() => {
    const metricData = props.jsonData
    const normalBarType = props.type === ChartType.BAR
    // For question types returns
    if (normalBarType) {
        return {
            labels: metricData?.map(metricObj => metricObj.label),
            datasets: [{
                backgroundColor: metricData?.map((dataObj, index) => {
                    return generateRandomColor(index)
                }),
                data: metricData?.map(dataObj => {
                    return dataObj.percent
                })
            }]
        }
    } else {
        return {
            labels: props.groupBy,
            datasets: metricData?.map((dataObj, index) => {
                return {
                    label: dataObj.label,
                    backgroundColor: generateRandomColor(index),
                    data: dataObj.percent
                }
            })
        }
    }
})
</script>