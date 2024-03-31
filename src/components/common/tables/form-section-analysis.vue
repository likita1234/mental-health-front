<script setup>
// import { ref, onMounted } from 'vue';

const props = defineProps({
    tableHeader: {
        type: String,
        default: 'Section Title'
    },
    tableData: {
        type: Array,
        required: true
    }
})
// Actions
</script>

<template>
    <div class="card">
        <DataTable :value="tableData" rowGroupMode="rowspan" groupRowsBy="questionTitle" sortMode="single"
            sortField="questionTitle" :sortOrder="1">
            <template #empty> No data found. </template>
            <template #header>
                <div class="flex">
                    <span class="text-xl text-900 font-bold">{{ tableHeader }}</span>
                </div>
            </template>
            <Column field="questionTitle" header="Questions" style="min-width: 200px">
                <template #body="slotProps">
                    <div class="flex align-items-center gap-2">
                        <span>{{ slotProps.data.questionTitle }}</span>
                    </div>
                </template>
            </Column>
            <Column field="optionTitle" header="Options" style="min-width: 200px" />
            <Column field="value" header="Frequency" style="min-width: 100px" />
            <Column field="percent" header="% Value" style="min-width: 150px">
                <template #body="slotProps">
                    <span>{{ slotProps.data.percent?.toFixed(2) }}</span>
                </template>
            </Column>
        </DataTable>
    </div>
</template>