<template>
    <div>
        <pie-chart :chartOptions="chartOptions" :chartData="chartData" />
    </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { generateRandomColors } from '@/constants/color'

// Props
const props = defineProps({
    type: {
        type: String,
        default: 'table'
    },
    jsonData: {
        type: Object,
    }
})

// Component states
const chartOptions = ref({
    responsive: true,
    maintainAspectRatio: false,
});

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