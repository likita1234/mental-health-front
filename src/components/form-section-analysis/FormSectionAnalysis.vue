<script setup>
import FormSectionSelectionDialog from '@/components/common/dialogs/form-section-selection.vue'
import FormSectionAnalysisTable from '@/components/common/tables/form-section-analysis.vue'
import { ref, computed, watch } from 'vue';
import { metricStore } from '@/stores';
import { formatFormSectionMetricToTableJson } from '@/utils/json-formatter'

// Component states
const analysisIds = ref({})
const tableData = ref([])

const dialogVisible = ref(false)
const dataLoading = ref(false)

// Computed Properties
const hasAnalysisIds = computed(() => {
    const { formId, sectionId } = analysisIds.value;
    return formId !== null && formId !== undefined && sectionId !== null && sectionId !== undefined;
});
// Watchers
watch(() => hasAnalysisIds.value, () => {
    if (hasAnalysisIds.value) {
        loadTableAnalysisData()
    }
})
// Actions
// When analysisIds are completely loaded, it will trigger this
const loadTableAnalysisData = async () => {
    dataLoading.value = true
    const { formId, sectionId } = analysisIds.value
    // Fetch metric data first
    const { sectionDetails, metricData } = await metricStore.getTableAnalysisByFormIdSectionId(formId, sectionId)
    // format the data into tableData format json
    if (metricData) {
        tableData.value = await formatFormSectionMetricToTableJson(metricData)
    }
    dataLoading.value = false
}

// loads selected information regarding analysis Ids from event
const analysisDataSelected = (event) => {
    const { formId, sectionId } = event
    analysisIds.value = { formId, sectionId }
    toggleDialog(false)
}

// Clean up selected information from the component
const clearSelectedData = () => {
    analysisIds.value = {}
    tableData.value = []
}

// Toggle the dialog visibility
const toggleDialog = (flag) => {
    dialogVisible.value = flag
}

</script>

<template>
    <div>
        <div class="flex justify-content-around">
            <Button v-if="!hasAnalysisIds" label="Choose Assessment Form and Section" @click="toggleDialog(true)" />
            <Button v-else label="Clear Selection" severity="warning" @click="clearSelectedData" />
        </div>
        <form-section-analysis-table v-if="hasAnalysisIds && !dataLoading" :tableData="tableData" />
        <!-- Dialog for form and section selection -->
        <form-section-selection-dialog v-if="dialogVisible" @form-section-selected="analysisDataSelected"
            @hide-dialog="toggleDialog(false)" />
    </div>
</template>