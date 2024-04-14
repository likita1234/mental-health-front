<!-- Supports only single datasets atm -->
<template>
    <Radar id="my-bar-chart-id" :data="chartData" :options="radarChartOptions" :style="{ 'max-height': '20rem' }" />
</template>

<script setup>
import { computed } from 'vue';
import { Radar } from 'vue-chartjs'

const props = defineProps({
    chartOptions: {
        type: Object,
        required: true
    },
    jsonData: {
        type: Object,
    },
    type: {
        type: String,
        required: true
    }
})

// Computed Properties
const radarChartOptions = computed(() => {
    return {
        ...props.chartOptions,
        layout: {
            padding: {
                top: 5,
            }
        },
        plugins: {
            legend: {
                display: false
            },
        },
        scales: {
            r: {
                pointLabels: {
                    font: {
                        size: 14,
                    }
                }
            }
        },
    }
})

const chartData = computed(() => {
    const metricData = props.jsonData
    return {
        labels: metricData?.map(metricObj => metricObj.label),
        datasets: [{
            backgroundColor: 'rgba(179,181,198,0.2)',
            borderColor: 'rgba(179,181,198,1)',
            pointBackgroundColor: 'rgba(179,181,198,1)',
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: 'rgba(179,181,198,1)',
            data: metricData?.map(dataObj => {
                return dataObj.percent ?? dataObj.value
            })
        }]
    }
})
</script>