<script setup>
import { onMounted, ref, computed, inject } from 'vue';

import { formStore } from '@/stores';
import { storeToRefs } from 'pinia';
import { showToast } from '@/utils/show-toast';

// props
const props = defineProps({
    id: {
        type: String,
        required: true
    }
})
// Global state
const appState = inject('appState')

// Store states
const { formDetails } = storeToRefs(formStore)

// Component states
const activeStep = ref(0) //starts with index 0

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

const hasNextStep = computed(() => {
    return (activeStep.value + 1) < formDetails.value?.sections?.length
})


// Navigate the steps
const toggleStep = (stepFlag) => {
    // First check if you have fulfilled all required questions
    if (checkRequiredAnswers()) {
        stepFlag ? activeStep.value++ : activeStep.value--
        // Scroll window
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }
}

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

</script>
<template>
    <div class="flex justify-content-center">
        <div class="card p-5 h-full w-full md:w-8">
            <h2 class="text-center">{{ formTitle }}</h2>
            <!-- Form Description -->
            <p class="text-center"> {{ formDescription }}</p>
            <Divider />
            <div v-if="sectionItems.length">
                <Steps v-model:activeStep="activeStep" :model="sectionItems" class="custom-steps">
                    <template #item="{ item, active }">
                        <span class="border-primary border-1 p-1 cursor-pointer"
                            :class="{ 'bg-primary': active, 'surface-overlay text-primary': !active }">
                            {{ item.label }}
                        </span>
                    </template>
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
                    <Button @click="toggleStep(true)" label="Next" :disabled="!hasNextStep" />
                </div>
            </div>
        </div>
    </div>
</template>