<script setup>
import AssessmentFormSelection from '@/components/common/dropdowns/assessment-form-selection.vue'
import FormSectionAnalysisTable from '@/components/common/tables/form-section-analysis.vue'
import SectionSelection from '@/components/common/dropdowns/section-selection.vue'

import { ref, watch } from 'vue';
import { metricStore } from '@/stores';
import { formatFormSectionMetricToTableJson } from '@/utils/json-formatter'

// Component states
const selectedForm = ref(null)
const selectedSection = ref(null)
const tableHeader = ref(null)
const tableData = ref([])
const dataLoading = ref(false)

// Watchers
watch([() => selectedForm.value, () => selectedSection.value], () => {
    loadData();
});

// Actions
const loadData = () => {
    if (selectedForm.value !== null && selectedSection.value !== null) {
        loadTableAnalysisData();
    } else {
        clearDataTable();
    }
}

// When analysisIds are completely loaded, it will trigger this
const loadTableAnalysisData = async () => {
    dataLoading.value = true;
    await metricStore.getTableAnalysisByFormIdSectionId(selectedForm.value, selectedSection.value)
        .then(({ sectionDetails, metricData }) => {
            if (sectionDetails && metricData) {
                tableHeader.value = sectionDetails.title.english;
                tableData.value = formatFormSectionMetricToTableJson(metricData);
            }
        })
        .finally(() => {
            dataLoading.value = false;
        });
}

const clearDataTable = () => {
    tableHeader.value = null
    tableData.value = []
}
</script>

<template>
    <div>
        <!-- Selection -->
        <div class="flex justify-content-center align-items-bottom gap-2">
            <assessment-form-selection @form-selected="selectedForm = $event" />
            <section-selection @section-selected="selectedSection = $event" />
        </div>
        <!-- Analysis Table -->
        <div class="flex justify-content-center">
            <form-section-analysis-table v-if="selectedForm !== null && selectedSection !== null"
                :tableHeader="tableHeader" :tableData="tableData" />
        </div>
    </div>
</template>