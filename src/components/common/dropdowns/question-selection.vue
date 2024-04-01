<script setup>
import { onMounted, ref } from 'vue';
import { storeToRefs } from 'pinia'
import { questionStore } from '@/stores'

const emit = defineEmits(['question-selected'])

const props = defineProps({
    params: {
        type: Object,
        default: {}
    }
})

// Store states
const { allQuestions, params } = storeToRefs(questionStore)

// Component states
const selectedQuestion = ref(null)

onMounted(() => {
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
        <BaseDropdown v-model="selectedQuestion" :options="allQuestions" label="Select a question"
            :placeholder="'Select a question'" :optionLabel="'title.' + [appState.lang]" :optionValue="'_id'" filter
            @change="emit('question-selected', $event)" />
    </div>
</template>