<script setup>
import QuestionOptions from './QuestionOptions.vue';

import { ref, computed, onUnmounted } from 'vue';
import { storeToRefs } from 'pinia';
import { questionStore, formErrorStore } from '@/stores';
import { QuestionType } from '@/constants';
import { getQuestionType } from '@/utils/array-helpers';
import { QuestionSchema, handleValidation } from '@/validations/schemas';


const emit = defineEmits(['hide-dialog'])
const props = defineProps({
    editMode: {
        type: Boolean,
        default: false
    }
})

// store states
const { question } = storeToRefs(questionStore)
const { formErrors } = storeToRefs(formErrorStore)
// component states
const questionTypeOption = getQuestionType();
const loading = ref(false)

// computed properties 
const formHeader = computed(() => {
    return props.editMode ? 'Update Question' : 'Add new Question'
})

const hasOptions = computed(() => {
    return question.value.type === QuestionType.RADIO || question.value.type === QuestionType.CHECKBOX
})

onUnmounted(() => {
    // Reset params in formError store
    formErrorStore.clearErrors()
})

// Actions
const submit = async () => {
    loading.value = true
    // 1) Validate question form
    const validated = await handleValidation(question.value, QuestionSchema)
    // console.log(formErrors.value)
    // 2) If validated is true, then submit, if there are issues in login, show invalid credentials toast
    if (validated) {
        // If its edit mode then update the question details otherwise submit the question
        const submitted = props.editMode ? await questionStore.updateQuestionDetails() : await questionStore.addNewQuestion()
        // 3) If successful, then close dialog
        if (submitted) {
            emit('hide-dialog')
        }

    }
    loading.value = false
}

const hideDialog = () => {
    emit('hide-dialog')
    questionStore.initQuestionData()
}
</script>

<template>
    <div>
        <FormDialog :header="formHeader" width="50vw" @hide-dialog="hideDialog" @submit.preventDefault()="submit">
            <div class="p-fluid">
                <!-- Question Title Section -->
                <div class="formgrid grid">
                    <div class="field col">
                        <BaseTextInput v-model="question.title.english" label="Title"
                            :errorMessage="formErrors['title.english']" />
                    </div>
                    <div class="field col">
                        <BaseTextInput v-model="question.title.nepali" label="Title (Nepali)"
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
                            :errorMessage="formErrors['description.nepali']" />
                    </div>
                </div>
                <!-- Question Type -->
                <div class="formgrid flex justify-content-start flex-wrap">
                    <div class="field col">
                        <BaseDropdown v-model="question.type" :options="questionTypeOption" label="Type"
                            :optionValue="'value'" placeholder="Select a question type" :showClear="false"
                            :errorMessage="formErrors.type" :disabled="editMode"/>
                    </div>
                    <div class="field col">
                        <label for="required">Required Field</label>
                        <div class="w-9rem">
                            <ToggleButton id="required" v-model="question.required" onLabel="True" offLabel="False" class="w-full" aria-label="Do you confirm" />
                        </div>
                    </div>
                </div>
                <!-- Question Options -->
                <template v-if="hasOptions">
                    <QuestionOptions :options="question.options" />
                </template>
            </div>
        </FormDialog>
    </div>
</template>