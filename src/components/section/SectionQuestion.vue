<script setup>
import { inject } from 'vue';
import { storeToRefs } from 'pinia';
import { questionStore, formErrorStore } from '@/stores';

const emit = defineEmits(['remove-question'])
const props = defineProps({
    keyIndex: {
        type: Number,
        required: true
    },
    question: {
        type: Object,
        required: true
    }
})


const appState = inject('appState')

// Store states
const { allQuestions } = storeToRefs(questionStore)
const { formErrors } = storeToRefs(formErrorStore)

</script>


<template>
    <div class="grid gap-2">
        <!-- Question Order -->
        <BaseNumberInput v-model="question.order" label="Order"
            :errorMessage="formErrors[`questions[${props.keyIndex}]` + '.order']" />
        <!-- Question Selection Dropdown -->
        <BaseDropdown v-model="question.questionId" :options="allQuestions" :label="'Question'"
            :placeholder="'Select a question'" :errorMessage="formErrors[`questions[${props.keyIndex}]` + '.questionId']"
            :optionLabel="'title.' + [appState.lang]" :optionValue="'_id'" filter />
        <!-- Button to remove question -->
        <div class="mt-4">
            <Button icon="pi pi-trash" severity="danger" rounded aria-label="Remove Question"
                @click="emit('remove-question', keyIndex)" />
        </div>
    </div>
</template>