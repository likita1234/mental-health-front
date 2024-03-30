<template>
    <div>
        <DataTable :value="tableData">
            <template #header>
                <div class="flex flex-wrap align-items-center justify-content-center gap-2">
                    <span class="text-xl text-900 font-bold">Comparative Analysis</span>
                </div>
            </template>
            <Column field="title" header="METRIC TITLE" />
            <Column field="weightedMean" header="WEIGHTED MEAN" />
            <Column field="standardDeviation" header="STANDARD DEVIATION" />
            <template #footer> In total there are {{ data ? data.length : 0 }} metrics compared. </template>
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
    return props.data?.map(dataObj=>{
        return {
            ...dataObj,
            weightedMean: dataObj.weightedMean?.toFixed(2),
            standardDeviation: dataObj.standardDeviation?.toFixed(2),
        }
    })
})

</script>