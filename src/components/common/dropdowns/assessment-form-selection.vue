<script setup>
import { ref, onMounted, watch } from 'vue'
import { storeToRefs } from 'pinia'
import { formStore } from '@/stores'

const emit = defineEmits(['update:modelValue', 'form-sections'])

const props = defineProps({
    modelValue: {
        type: String
    }
})

// Store states
const { allForms } = storeToRefs(formStore)

// Component States
const selectedForm = ref(null)

// Watchers
watch(() => props.modelValue, () => {
    selectedForm.value = props.modelValue
})

onMounted(() => {
    selectedForm.value = props.modelValue
    loadAssessmentForms()
})

// Actions
// At the moment assessment forms are very limited so we are not utilizing any parameters
const loadAssessmentForms = async () => {
    await formStore.fetchAllForms()
}

const formSelected = (event) => {
    const selectedForm = allForms.value?.find(form => form._id === event)
    const selectedFormSections = selectedForm?.sections?.map(section => section.sectionId)
    emit('update:modelValue', event)
    emit('form-sections', selectedFormSections)
}
</script>

<template>
    <BaseDropdown v-model="selectedForm" label="Select an assessment form" :options="allForms"
        :optionLabel="'title.' + [appState.lang]" optionValue="_id" placeholder="Choose an option"
        @change="formSelected" />
</template>