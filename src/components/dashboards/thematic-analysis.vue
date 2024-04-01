<script setup>
import FormQuestionSelectionDialog from '@/components/common/dialogs/form-question-selection.vue'
import { ref, computed, watch, inject } from 'vue';
import { metricStore, questionStore } from '@/stores';

const appState = inject('appState')

// Component states
const analysisIds = ref({})
const words = ref([])
const dialogVisible = ref(false)
const dataLoading = ref(false)
const questionDetails = ref(null)

// Computed Properties
const hasAnalysisIds = computed(() => {
    const { formId, questionId } = analysisIds.value;
    return formId !== null && formId !== undefined && questionId !== null && questionId !== undefined;
});

const questionTitle = computed(() => {
    return questionDetails.value ? questionDetails.value?.title[appState.lang] : null
})

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
    // Convert the data into proper weighted keywords format
    words.value = Object.entries(keywords)
    // Load Question details
    questionDetails.value = await questionStore.fetchQuestionDetails(questionId)
    console.log(questionDetails.value)
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
    words.value = []
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
        <template v-if="words && words.length > 0">
            <h4 class="mx-auto">{{ questionTitle }}</h4>
            <custom-word-cloud :words="words" class="p-2" />
        </template>

        <!-- Dialog for form and question selection -->
        <form-question-selection-dialog v-if="dialogVisible" @form-question-selected="analysisDataSelected"
            @hide-dialog="toggleDialog(false)" />
    </div>
</template>