<script setup>
import { ref } from 'vue';
import { getQuestionType } from '@/utils/array-helpers'

const emit = defineEmits(['question-type-selected'])
// Component states
const questionTypes = ref(getQuestionType())
const selectedType = ref(null)
</script>

<template>
    <BaseDropdown v-model="selectedType" :options="questionTypes" :placeholder="'Select a Type'" :optionLabel="'name'"
        :optionValue="'value'" filter @change="emit('question-type-selected', $event)" />
</template>
