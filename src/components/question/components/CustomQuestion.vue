<script setup>
import { ref, computed, inject } from 'vue';
import { QuestionType } from '@/constants'

// Props
const props = defineProps({
    modelValue: String,
    question: Object
});

const appState = inject('appState')

// Component states
const answer = ref(null)

// Computed properties
const label = computed(() => {
    return props.question?.title[appState.lang]
})

const description = computed(() => {
    return props.question?.description[appState.lang]
})

const type = computed(() => {
    return props.question?.type
})

const options = computed(() => {
    return props.question?.options
})



</script>

<template>
    <div class="field col">
        <!-- Input text type -->
        <template v-if="type === QuestionType.TEXT">
            <BaseTextInput v-model="answer" :label="label" />
        </template>

        <template v-if="type === QuestionType.RADIO || type === QuestionType.CHECKBOX">
            <BaseSelectionInput v-model="answer" :label="label" :options="options"
                :radio="type === QuestionType.RADIO" />
        </template>

        <template v-if="type === QuestionType.RATINGS">
            <BaseRating v-model="answer" :label="label" :description="description" :cancel="true" />
        </template>

    </div>

</template>