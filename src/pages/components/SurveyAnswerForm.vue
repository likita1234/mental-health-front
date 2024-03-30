<script setup>
import CsvParser from '@/components/global/CsvParser.vue'

import { onMounted, ref, computed, inject } from 'vue';
import { useRouter } from 'vue-router';

import { authStore, answerStore, formStore } from '@/stores';
import { UserRole } from '../../constants/user-role'
import { storeToRefs } from 'pinia';
import { showToast } from '@/utils/show-toast';
import AppResponse from '@/utils/app-response';

// props
const props = defineProps({
    id: {
        type: String,
        required: true
    }
})

const router = useRouter()
// Global state
const appState = inject('appState')

// Store states
const { userRole } = storeToRefs(authStore)
const { formDetails } = storeToRefs(formStore)

// Component states
const activeStep = ref(0) //starts with index 0
const uploadingCsv = ref(false)

// Computed properties
const formTitle = computed(() => {
    return formDetails.value?.title[appState.lang]
})

const formDescription = computed(() => {
    return formDetails.value?.description[appState.lang]
})

// Returns a list of section items for Steps
const sectionItems = computed(() => {
    let items = []
    for (let i = 0; i < formDetails.value?.sections?.length; i++) {
        items.push({ label: 'Section ' + (i + 1) })
    }
    return items
})

// Returns the current active section based on activeStep index
const activeSection = computed(() => {
    return formDetails.value?.sections[activeStep.value];
})

const hasPreviousStep = computed(() => {
    return activeStep.value !== 0
})

const isFinalStep = computed(() => {
    return (activeStep.value + 1) == formDetails.value?.sections?.length
})

onMounted(() => {
    setupAssessmentDetails()
})

// Actions

const setupAssessmentDetails = async () => {
    // First load assessment details
    await loadAssessmentDetails()
}

const loadAssessmentDetails = async () => {
    const formId = props.id
    await formStore.fetchFormDetails(formId)
}

const submitForm = async () => {
    const response = await answerStore.submitAnswerForm(formDetails.value)
    if (response) {
        // clean the section object
        answerStore.initAnswerForm()
        new AppResponse(201, 'Survey Form submitted successfully')
        setTimeout(() => router.push({ name: 'survey' }), 2000)
    }
}

// Navigate the steps
const toggleStep = (stepFlag) => {
    // First check if you have fulfilled all required questions
    if (checkRequiredAnswers()) {
        // Check if its final step and stepFlag is true then submit
        if (stepFlag && isFinalStep.value) {
            submitForm()
        } else {
            stepFlag ? activeStep.value++ : activeStep.value--
            // Scroll window
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        }
    }
}

const checkRequiredAnswers = () => {
    // filter out all required questions with no answer 
    const unansweredQuestions = activeSection.value?.questions?.filter(question => question.required && question.answer == null)

    // If there is unanswered questions with required fields then
    if (unansweredQuestions.length) {
        showToast('info', 'Invalid Submission', 'Mandatory fields required')
    } else {
        return true
    }

}

const loadSurveyJson = async (jsonData) => {
    try {
        uploadingCsv.value = true
        // Form id and other details will already be in formDetails in store state
        const uploadedDataCount = await answerStore.submitCsvData(jsonData, formDetails.value)
        return new AppResponse(200, `Successfully loaded ${uploadedDataCount} data`)
    } catch (error) {
        return new AppResponse(400, 'Failed to upload csv')
    } finally {

        uploadingCsv.value = false
    }
}
</script>
<template>
    <div class="flex justify-content-center">
        <div class="card p-5 h-full w-full md:w-8">
            <div class="flex justify-content-center">
                <language-selection />
            </div>
            <h2 class="text-center">{{ formTitle }}</h2>
            <!-- Form Description -->
            <p class="text-center"> {{ formDescription }}</p>
            <div v-if="userRole === UserRole.SUPERADMIN" class="flex justify-content-center">
                <csv-parser @json-created="loadSurveyJson" />
            </div>
            <Divider />
            <div v-if="sectionItems.length">
                <Steps v-model:activeStep="activeStep" :model="sectionItems" class="custom-steps">
                    <!-- <template #item="{ item, active }">
                        <span class="border-primary border-1 p-1 cursor-pointer"
                            :class="{ 'bg-primary': active, 'surface-overlay text-primary': !active }">
                            {{ item.label }}
                        </span>
                    </template> -->
                </Steps>
            </div>
            <Divider />

            <div v-if="activeSection" class="section-container">
                <div class="flex flex-column justify-content-center align-items-center">
                    <!-- Section Title Here -->
                    <h4>{{ activeSection.title[appState.lang] }}</h4>
                    <!-- Section Description Here -->
                    <p v-if="activeSection.description">{{ activeSection.description[appState.lang] }}</p>
                    <Divider />
                </div>
                <div class="questions-container">
                    <!-- Section Questions Here -->
                    <CustomQuestion v-for="question in activeSection.questions" v-model="question.answer"
                        :question="question" :key="question._id" />
                </div>
                <Divider />
                <div class="flex mb-2 gap-2 justify-content-between">
                    <Button @click="toggleStep(false)" label="Previous" :disabled="!hasPreviousStep" />
                    <Button @click="toggleStep(true)" :label="isFinalStep ? 'Submit' : 'Next'" />
                </div>
            </div>
        </div>
    </div>
</template>