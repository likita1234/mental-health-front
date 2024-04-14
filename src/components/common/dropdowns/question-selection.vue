<script setup>
import { onMounted, ref, computed, watch } from 'vue';
import { storeToRefs } from 'pinia'
import { questionStore } from '@/stores'

const emit = defineEmits(['update:modelValue'])

const props = defineProps({
    modelValue: {
        type: String
    },
    params: {
        type: Object,
        default: {}
    },
    questionFilters: {
        type: Array,
        default: []
    }
})

// Store states
const { allQuestions, params } = storeToRefs(questionStore)

// Component states
const selectedQuestion = ref(null)

// Computed properties
const filteredQuestions = computed(() => {
    return props.questionFilters?.length > 0 ? allQuestions.value.filter(question => props.questionFilters.includes(question._id)) : allQuestions.value
})


watch(() => props.modelValue, () => {
    selectedQuestion.value = props.modelValue
})

onMounted(() => {
    selectedQuestion.value = props.modelValue
    loadQuestions()
})

// Actions
const loadQuestions = async () => {
    // Only load open end questions
    params.value = props.params
    await questionStore.fetchAllQuestions()
}
</script>

<template>
    <div>
        <BaseDropdown v-model="selectedQuestion" :options="filteredQuestions" label="Select a question"
            :placeholder="'Select a question'" :optionLabel="'title.' + [appState.lang]" :optionValue="'_id'" filter
            @change="emit('update:modelValue', $event)" />
    </div>
</template>