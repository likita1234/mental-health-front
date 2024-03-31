<script setup>
import { ref, onMounted, watch, } from 'vue'
import { storeToRefs } from 'pinia'

import { formStore } from '@/stores'

const emit = defineEmits(['form-selected'])

// Props
const props = defineProps({
    type: {
        type: String,
        default: 'normal'
    }
})

// Store states
const { allForms } = storeToRefs(formStore)

// Component States
const selectedForm = ref(null)

// Watchers for analysis of form selection 
watch(() => selectedForm.value, () => {
    if (selectedForm.value) {
        const formDetails = allForms.value.find(form => form._id === selectedForm.value)
        emit('form-selected', formDetails?._id)
    }
})

onMounted(() => {
    loadAssessmentForms()
})

// Actions
// At the moment assessment forms are very limited so we are not utilizing any parameters
const loadAssessmentForms = async () => {
    // Check if allForms already have value, if yes then no need to make another request
    if (allForms.value && allForms.value?.length <= 0) {
        await formStore.fetchAllForms()
    }
}
</script>

<template>
    <div>
        <BaseDropdown v-model="selectedForm" :label="'Start by selecting an assessment form'" :options="allForms"
            optionLabel="engTitle" optionValue="_id" placeholder="Select a form" :showClear="false" />
    </div>
</template>