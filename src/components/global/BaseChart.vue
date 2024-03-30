<template>
    <div v-if="chartData" class="card">
        <slot name="title-section">
            <h5 v-if="props.title">{{ props.title }}</h5>
        </slot>
        <span v-if="data?.length <= 0">Data Not Available</span>
        <Chart v-else :type="props.chartType" :data="chartData" :options="chartOptions"
            style="position: relative; width: 100%" />
    </div>
</template>
<script setup>
import { ref, watch, onMounted } from 'vue';
import { ChartType } from '@/constants/chart-type'
import { getPieChartDatasets, getBarChartDatasets } from '@/utils/chart-helpers';

const props = defineProps({
    data: {
        type: Array,
        default: null,
    },
    title: {
        type: String,
    },
    chartType: {
        type: String,
    },
    showLegend: {
        type: Boolean,
        default: true,
    },
    stacked: {
        type: Boolean,
        default: false,
    },
    customizeInnerColor: {
        type: Boolean,
        default: false,
    },
});

/** Generic Properties */
const chartLabels = ref();
const chartData = ref({
    labels: null,
    datasets: [],
});
const chartOptions = ref(null);

watch(
    () => props.data,
    async () => {
        if (props.data && props.data.length) {
            // setup chart
            await loadChartData();
        }
    }
);

onMounted(async () => {
    await loadChartData();
});

const loadChartData = async () => {
    // initiate chart labels
    chartLabels.value = props.data?.map((item) => item.label);
    chartData.value = await setChartData();
    chartOptions.value = setChartOptions();
};

const setChartData = async () => {
    const documentStyle = getComputedStyle(document.documentElement);
    let datasets = [];
    if (props.chartType === ChartTypes.PIE || props.chartType == ChartTypes.DOUGHNUT) {
        datasets = getPieChartDatasets(props.data, documentStyle);
    } else {
        datasets = getBarChartDatasets(props.data, documentStyle, props.chartType === ChartTypes.LINE, props.customizeInnerColor);
    }

    return {
        // Group By acts like x-axis which will be the initial labels
        labels: chartLabels.value,
        datasets,
    };
};

const setChartOptions = () => {
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--text-color');
    const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
    const surfaceBorder = documentStyle.getPropertyValue('--surface-border');

    const options = {
        plugins: {
            legend: props.showLegend
                ? {
                    labels: {
                        usePointStyle: props.chartType === ChartTypes.PIE,
                        fontColor: textColor,
                    },
                }
                : {
                    display: false,
                },
        },
    };

    //Scales added only for Bar and Line charts
    if (props.chartType == ChartTypes.BAR || props.chartType == ChartTypes.LINE) {
        options.scales = {
            x: {
                stacked: props.stacked,
                ticks: {
                    color: textColorSecondary,
                    font: {
                        weight: 500,
                    },
                },
                grid: {
                    color: surfaceBorder,
                },
            },
            y: {
                stacked: props.stacked,
                ticks: {
                    color: textColorSecondary,
                },
                grid: {
                    color: surfaceBorder,
                },
                min: 0,
            },
        };
    }

    return options;
};
</script>
