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
    [0, '#FF0000'], // Color for minimum value (e.g., 0)
    [0.5, '#FFFFFF'], // Intermediate color
    [1, '#0000FF'], // Color for maximum value (e.g., 1)
];

const layout = ref({
    title: 'Correlation Heatmap',
    annotations: [],
    xaxis: {
        ticks: '',
    },
    yaxis: {
        ticks: '',
        ticksuffix: ' ',
        automargin: true,
        autosize: true,
    },
    // Adjust margin to give space for the x-axis title
    margin: {
        l: 50, // Adjust this value as needed
        r: 30,
        t: 80,
        b: 50,
    },
})

onMounted(() => {
    loadHeatMapData()
})

const loadHeatMapData = () => {
    xValues.value = props.datasets?.map((dataset) => dataset.title);
    yValues.value = xValues.value
    zValues.value = props.datasets?.map((dataset) => dataset.data);

    // Data for ploty
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

    // Creating the Plotly.js plot
    Plotly.newPlot('plotyHeatmap', data, layout.value, { staticPlot: true });
}

const loadDatasets = () => {
    for (let i = 0; i < yValues.value?.length; i++) {
        for (let j = 0; j < xValues.value?.length; j++) {
            // debugger
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