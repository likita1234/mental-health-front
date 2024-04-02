<script setup>
import { ref, onMounted, } from 'vue'
import { storeToRefs } from 'pinia'

import { formStore } from '@/stores'

const emit = defineEmits(['form-selected'])

// Store states
const { allForms } = storeToRefs(formStore)

// Component States
const selectedForm = ref(null)

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
    <BaseDropdown v-model="selectedForm" label="Select an assessment form" :options="allForms"
        :optionLabel="'title.' + [appState.lang]" optionValue="_id" placeholder="Choose an option"
        @change="emit('form-selected', $event)" />
</template>