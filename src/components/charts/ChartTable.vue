<template>
    <!-- scrollHeight="270px" -->
    <DataTable :value="tableData" scrollable scrollHeight="350px">
        <Column field="label" header="GROUP BY" />
        <Column field="count" header="RESPONDENTS" />
        <Column field="percent" header="% VALUE" />
    </DataTable>
</template>

<script setup>
import { ref, computed } from 'vue';

// Props
const props = defineProps({
    jsonData: {
        type: Object,
    },
    groupBy: {
        type: Array
    }
})

// Component States
const totalCount = ref(0)
const totalPercent = ref(0)

// Computed properties 

const tableData = computed(() => {
    const data = props.jsonData
    // Loop through overall jsondata and add count and percent
    for (const item of data) {
        totalCount.value += item.count;
        totalPercent.value += item.percent;
    }

    // Create a total object
    const totalObject = {
        label: 'Total',
        count: totalCount.value,
        percent: totalPercent.value?.toFixed(0) + ' %'
    }

    // Now return it along the array
    return [
        ...data,
        totalObject
    ]

})

</script>