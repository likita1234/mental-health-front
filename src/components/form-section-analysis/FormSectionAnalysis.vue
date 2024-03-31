<script setup>
import FormSectionSelectionDialog from '@/components/common/dialogs/form-section-selection.vue'
import FormSectionAnalysisTable from '@/components/common/tables/form-section-analysis.vue'
import { ref, computed } from 'vue';

// Component states
const dialogVisible = ref(false)
const analysisIds = ref({})

// Computed Properties
const hasAnalysisIds = computed(() => {
    const { formId, sectionId } = analysisIds.value;
    return formId !== null && formId !== undefined && sectionId !== null && sectionId !== undefined;
});
// Actions
const analysisDataSelected = (event) => {
    const { formId, sectionId } = event
    analysisIds.value = { formId, sectionId }
    toggleDialog(false)
}

const toggleDialog = (flag) => {
    dialogVisible.value = flag
}

</script>

<template>
    <div>
        <div class="flex justify-content-around">
            <Button v-if="!hasAnalysisIds" label="Choose Assessment Form and Section" @click="toggleDialog(true)" />
            <Button v-else label="Clear Selection" severity="warning" @click="analysisDataSelected({})" />
        </div>
        <form-section-analysis-table v-show="hasAnalysisIds" :analysisIds="analysisIds" />
        <!-- Dialog for form and section selection -->
        <form-section-selection-dialog v-if="dialogVisible" @form-section-selected="analysisDataSelected"
            @hide-dialog="toggleDialog(false)" />
    </div>
</template>