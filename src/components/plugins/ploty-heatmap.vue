<template>
    <!-- Plotly chart will be drawn inside this DIV -->
    <div id='plotyHeatmap' class="">
    </div>

</template>

<script setup>
import Plotly from 'plotly.js-dist-min';

import { ref, onMounted } from 'vue';

const props = defineProps({
    datasets: {
        type: Array
    }
})

// Component states
const xValues = ref([])
const yValues = ref([])
const zValues = ref([])


const colorscaleValue = [
    [0, '#FF0000'],
    [0.5, '#FFFFFF'],
    [1, '#0000FF'],
];

const layout = ref({
    title: {
        text: 'Correlation Heatmap',
        font: {
            size: 20,
            color: '#000',
            family: 'Arial, sans-serif',
            weight: 'bold'
        }
    },
    annotations: [],
    xaxis: {
        ticks: '',
        text: '',
        tickfont: {
            family: 'Arial, sans-serif',
            size: 14,
            color: '#000',
            weight: 'bold'
        }
    },
    yaxis: {
        ticks: '',
        ticksuffix: ' ',
        tickfont: {
            family: 'Arial, sans-serif',
            size: 14,
            color: '#000',
            weight: 'bold'
        },
        automargin: true,
        autosize: true,
    },
})

onMounted(() => {
    loadHeatMapData()
})

const loadHeatMapData = () => {
    xValues.value = props.datasets?.map((dataset) => dataset.title);
    yValues.value = xValues.value
    zValues.value = props.datasets?.map((dataset) => dataset.data);

    const data = [
        {
            x: xValues.value,
            y: yValues.value,
            z: zValues.value,
            type: 'heatmap',
            colorscale: colorscaleValue.value,
            showscale: true,
        },
    ];

    loadDatasets()

    Plotly.newPlot('plotyHeatmap', data, layout.value, { staticPlot: true, responsive: true });
}

const loadDatasets = () => {
    for (let i = 0; i < yValues.value?.length; i++) {
        for (let j = 0; j < xValues.value?.length; j++) {
            const currentValue = zValues.value[i][j];
            const textColor = currentValue !== 0.0 ? 'white' : 'black';
            const result = {
                xref: 'x1',
                yref: 'y1',
                x: xValues.value[j],
                y: yValues.value[i],
                text: currentValue,
                font: {
                    family: 'Arial',
                    size: 12,
                    color: 'rgb(50, 171, 96)',
                },
                showarrow: false,
                font: {
                    color: textColor,
                },
            };
            layout.value?.annotations.push(result);
        }
    }
}
</script>