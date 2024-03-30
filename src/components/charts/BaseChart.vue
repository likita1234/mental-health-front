<template>
    <div>
        <template v-if="!onlyTableMode">
            <!-- Pie Chart -->
            <pie-chart v-if="type === ChartType.PIE" :chartOptions="chartOptions" :jsonData="jsonData" />
            <!-- Bar Chart -->
            <bar-chart v-else-if="type === ChartType.BAR || type === ChartType.RATINGS_SUMMATION" :type="type"
                :chartOptions="chartOptions" :groupBy="groupBy" :jsonData="jsonData" />
            <line-chart v-else-if="type === ChartType.LINE" :chartOptions="chartOptions" :groupBy="groupBy"
                :jsonData="jsonData" />
        </template>
        <chart-table v-else :jsonData="jsonData" />
    </div>
</template>

<script setup>
import { ref, inject, computed } from 'vue';
import {
    Chart as ChartJS,
    ArcElement,
    BarElement,
    CategoryScale,
    LinearScale,
    LineElement,
    PointElement,
    Title,
    Legend,
    Tooltip,
} from 'chart.js'

import ChartDataLabels from 'chartjs-plugin-datalabels';

ChartJS.register(
    ChartDataLabels,
    ArcElement,
    BarElement,
    CategoryScale,
    LinearScale,
    LineElement,
    PointElement,
    Title,
    Legend,
    Tooltip)

ChartJS.defaults.set('plugins.datalabels', {
    color: '#FFF'
});

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

// Global property
const appState = inject('appState')

// Component states
const chartOptions = ref({
    responsive: true,
    maintainAspectRatio: false,
});

// Computed Properties
const onlyTableMode = computed(() => {
    return appState.tableMode
})
</script>