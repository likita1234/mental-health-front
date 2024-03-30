<script setup>
import { ref, computed, inject, watch, onMounted, } from 'vue';
import { QuestionType } from '@/constants'

// Emits
const emit = defineEmits(['update:modelValue'])
// Props
const props = defineProps({
    modelValue: [String, Number, Array, Object],
    question: Object
});

const appState = inject('appState')

// Component states
const answer = ref(null)

// Computed properties
const existingQuestionAnswer = computed(() => {
    return props.question?.answer
})

const label = computed(() => {
    return props.question?.title[appState.lang] + ' ' + (description.value ? ('(' + description.value + ')') : null)
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


// Watcher for answer data changes
watch(() => existingQuestionAnswer.value, () => {
    console.log('Existing changes')
    answer.value = existingQuestionAnswer.value
})

watch(() => answer.value, () => {
    console.log('Answer value update')
    emit('update:modelValue', answer.value)
})

// Loads the modelValue into the answer
onMounted(() => {
    if (props.modelValue) {
        answer.value = props.modelValue
    }
})

</script>

<template>
    <div class="field col">
        <!-- Input text type -->
        <template v-if="type === QuestionType.TEXT">
            <BaseTextInput v-model="answer" :label="label" />
        </template>

        <template v-if="type === QuestionType.LONGTEXT">
            <BaseTextarea v-model="answer" :label="label" />
        </template>

        <template v-else-if="type === QuestionType.NUMBER">
            <BaseNumberInput v-model="answer" :label="label" />
        </template>

        <template v-else-if="type === QuestionType.RADIO || type === QuestionType.CHECKBOX">
            <BaseSelectionInput v-model="answer" :label="label" :options="options"
                :radio="type === QuestionType.RADIO" />
        </template>

        <template v-else-if="type === QuestionType.RATINGS">
            <BaseRating v-model="answer" :label="label" :description="description" :cancel="true" />
        </template>
    </div>

</template>