<script setup>
import AssessmentFormSelection from '../common/dropdowns/assessment-form-selection.vue';
import QuestionSelection from '../common/dropdowns/question-selection.vue';

import { ref, computed, watch, inject, onUnmounted } from 'vue';
import { metricStore, questionStore } from '@/stores';
import { QuestionType } from '@/constants'

const appState = inject('appState')

// Component states
const selectedForm = ref(null)
const selectedQuestion = ref(null)
const words = ref([])
const dataLoading = ref(false)
const questionParams = ref({ type: QuestionType.LONGTEXT })
const questionDetails = ref(null)


// Computed Properties
const questionTitle = computed(() => {
    return questionDetails.value ? questionDetails.value?.title[appState.lang] : null
})


// Watchers
watch([() => selectedForm.value, () => selectedQuestion.value], () => {
    loadData();
});

onUnmounted(() => {
    // Reset params in question store
    questionStore.params = null
})

// Action
const loadData = () => {
    if (selectedForm.value !== null && selectedQuestion.value !== null) {
        loadQuestionKeywords();
    } else {
        clearKeywords();
    }
}


// When analysisIds are completely loaded, it will trigger this
const loadQuestionKeywords = async () => {
    dataLoading.value = true
    // Fetch metric data first
    await metricStore.getKeywordsAnalysisByFormIdQuestionId(selectedForm.value, selectedQuestion.value).then(async (res) => {
        const keywords = res.keywords
        // Convert the data into proper weighted keywords format
        words.value = Object.entries(keywords)
    }).finally(() => {
        dataLoading.value = false
    })
    // Load Question details
    questionDetails.value = await questionStore.fetchQuestionDetails(selectedQuestion.value)
}

// Clean up selected information from the component
const clearKeywords = () => {
    words.value = []
    questionDetails.value = null
}

</script>
<template>
    <div class="flex flex-column gap-3">
        <!-- Selection -->
        <div class="flex justify-content-center gap-2 flex-wrap">
            <assessment-form-selection v-model="selectedForm" />
            <question-selection v-model="selectedQuestion" :params="questionParams" />

        </div>
        <!-- Word Cloud -->
        <template v-if="words && words.length > 0">
            <h4 class="mx-auto">{{ questionTitle }}</h4>
            <custom-word-cloud :words="words" class="p-2" />
        </template>
        <template v-else>
            <div class="flex justify-content-center align-items-center h-5rem">
                <h4>No data found. Please try different options</h4>
            </div>
        </template>
    </div>
</template>