<template>
    <div>
        <!-- Pie Chart -->
        <pie-chart v-if="type === ChartType.PIE" :chartOptions="chartOptions" :jsonData="jsonData" />
        <!-- Bar Chart -->
        <bar-chart v-else-if="type === ChartType.BAR || type === ChartType.RATINGS_SUMMATION"
            :chartOptions="chartOptions" :groupBy="groupBy" :jsonData="jsonData" />
        <line-chart v-else-if="type === ChartType.LINE" :chartOptions="chartOptions" :groupBy="groupBy"
            :jsonData="jsonData" />
        <chart-table v-else-if="type === ChartType.TABLE" :jsonData="jsonData" />
    </div>
</template>

<script setup>
import { ref } from 'vue';
import { ChartType } from '@/constants';
// Props
const props = defineProps({
    type: {
        type: String,
        default: 'table'
    },
    groupBy: {
        type: Array,
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

</script>