<template>
    <div>
        <DataTable :value="tableData">
            <template #header>
                <div class="flex flex-wrap align-items-center justify-content-center gap-2">
                    <span class="text-lg text-900 font-bold">{{ headerContent }}</span>
                </div>
            </template>
            <Column field="title" header="TITLE" />
            <Column field="respondentsCount" header="RESPONDENTS" />
            <Column field="weightedMean" header="WEIGHTED MEAN" />
            <Column field="standardDeviation" header="STANDARD DEVIATION" />
        </DataTable>
    </div>
</template>

<script setup>
import { computed } from 'vue';
// Props
const props = defineProps({
    data: {
        type: Object,
    },
})

// Computed properties 
const tableData = computed(() => {
    return props.data?.map(dataObj => {
        return {
            ...dataObj,
            weightedMean: dataObj.weightedMean?.toFixed(2),
            standardDeviation: dataObj.standardDeviation?.toFixed(2),
        }
    })
})

// Returns the number of respondents 
const headerContent = computed(() => {
    return tableData.value?.length ? 'Comparative Analysis between ' + generateStringFromTitles(tableData.value) : null
})

function generateStringFromTitles(data) {
    let result = '';
    for (let i = 0; i < data.length; i++) {
        const title = data[i].title;
        result += `"${title}"`;
        // Add comma for all elements except the last one
        if (i < data.length - 1) {
            result += ', ';
        }
        // If it's the second last element, add "and" before the last one
        if (i === data.length - 2) {
            result += ' and ';
        }
    }
    return result;
}

// Normally both metrics will have same number of respondents so we will fetch only from one of them
function generateRespondentsStringFromData(data) {
    let result = '';
    for (let i = 0; i < data.length; i++) {
        const item = data[i];
        result += `${item.respondentsCount} respondents in "${item.title}"`;
        // Add comma for all elements except the last one
        if (i < data.length - 1) {
            result += ', ';
        }
        // If it's the second last element, add "and" before the last one
        if (i === data.length - 2) {
            result += ' and ';
        }
    }
    return result;
}
</script>