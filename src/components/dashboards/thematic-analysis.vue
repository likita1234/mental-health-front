<script setup>
import FormQuestionSelectionDialog from '@/components/common/dialogs/form-question-selection.vue'
import { ref, computed, watch } from 'vue';
import { metricStore } from '@/stores';

// Component states
const analysisIds = ref({})
const keywords = ref([])
const dialogVisible = ref(false)
const dataLoading = ref(false)

// Computed Properties
const hasAnalysisIds = computed(() => {
    const { formId, questionId } = analysisIds.value;
    return formId !== null && formId !== undefined && questionId !== null && questionId !== undefined;
});

// Watchers
watch(() => hasAnalysisIds.value, () => {
    if (hasAnalysisIds.value) {
        loadQuestionKeywords()
    }
})

// When analysisIds are completely loaded, it will trigger this
const loadQuestionKeywords = async () => {
    dataLoading.value = true
    const { formId, questionId } = analysisIds.value
    // Fetch metric data first
    const { keywords } = await metricStore.getKeywordsAnalysisByFormIdQuestionId(formId, questionId)
    // format the data into tableData format json
    if (Object.entries(keywords)?.length > 0) {
        console.log(keywords)
    }
    dataLoading.value = false
}

// Loads data into analysis data
const analysisDataSelected = (event) => {
    const { formId, questionId } = event
    analysisIds.value = { formId, questionId }
    toggleDialog(false)
}


// Toggle the dialog visibility
const toggleDialog = (flag) => {
    dialogVisible.value = flag
}

// Clean up selected information from the component
const clearSelectedData = () => {
    analysisIds.value = {}
    keywords.value = []
}

</script>
<template>
    <div class="flex flex-column gap-3">
        <!-- Button -->
        <div class="flex">
            <Button v-if="!hasAnalysisIds" label="Choose Assessment Form and Question" @click="toggleDialog(true)" />
            <Button v-else label="Clear Selection" severity="warning" @click="clearSelectedData" />
        </div>
        <!-- Word Cloud -->
        <div>
            <custom-word-cloud :words="keywords" />
        </div>

        <!-- Dialog for form and question selection -->
        <form-question-selection-dialog v-if="dialogVisible" @form-question-selected="analysisDataSelected"
            @hide-dialog="toggleDialog(false)" />
    </div>
</template>