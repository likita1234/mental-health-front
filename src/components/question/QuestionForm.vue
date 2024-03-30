<script setup>
import QuestionOptions from './QuestionOptions.vue';

import { ref, computed, onMounted } from 'vue';
import { storeToRefs } from 'pinia';
import { questionStore, formErrorStore } from '@/stores';
import { QuestionType } from '@/constants';
import { getQuestionType } from '@/utils/array-helpers';
import { QuestionSchema, handleValidation } from '@/validations/schemas';

const emit = defineEmits(['hide-dialog'])

// store states
const { question } = storeToRefs(questionStore)
const { formErrors } = storeToRefs(formErrorStore)
// component states
const questionTypeOption = getQuestionType();
const loading = ref(false)

// computed properties 
const hasOptions = computed(() => {
    return question.value.type === QuestionType.RADIO || question.value.type === QuestionType.CHECKBOX
})

onMounted(() => {
    // 
})

// Actions
const submit = async () => {
    loading.value = true
    // 1) Validate question form
    const validated = await handleValidation(question.value, QuestionSchema)
    console.log(formErrors.value)
    // 2) If validated is true, then submit, if there are issues in login, show invalid credentials toast
    if (validated) {
        console.log('Form is valid')
        // 3) If successful, then redirect to the home page

    }
    loading.value = false
}
</script>

<template>
    <div>
        <FormDialog header="Question Form" width="50vw" @hide-dialog="emit('hide - dialog')"
            @submit.preventDefault();="submit">
            <div class="p-fluid">
                <!-- Question Title Section -->
                <div class="formgrid grid">
                    <div class="field col">
                        {{ formErrors.title?.english }}
                        <BaseTextInput v-model="question.title.english" label="Title" size="large"
                            :errorMessage="formErrors['title.english']" />
                    </div>
                    <div class="field col">
                        <BaseTextInput v-model="question.title.nepali" label="Title (Nepali)" size="large"
                            :errorMessage="formErrors['title.nepali']" />
                    </div>
                </div>
                <!-- Question Description Section -->
                <div class="formgrid grid">
                    <div class="field col">
                        <BaseTextarea v-model="question.description.english" label="Description"
                            :errorMessage="formErrors['description.english']" />
                    </div>
                    <div class="field col">
                        <BaseTextarea v-model="question.description.nepali" label="Description (Nepali)"
                            :errorMessage="formErrors['description.english']" />
                    </div>
                </div>
                <!-- Question Type -->
                <div class="formgrid grid">
                    <div class="field col">
                        <BaseDropdown v-model="question.type" :options="questionTypeOption" label="Type"
                            :optionValue="'value'" placeholder="Select a question type" :showClear="false"
                            :errorMessage="formErrors.type" />
                    </div>
                </div>
                <!-- Question Options -->
                <template v-if="hasOptions">
                    <QuestionOptions :options="question.options"/>
                </template>
            </div>
        </FormDialog>
</div></template>