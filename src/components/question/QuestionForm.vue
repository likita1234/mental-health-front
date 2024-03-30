<script setup>
import QuestionOptions from './QuestionOptions.vue';

import { computed, onMounted } from 'vue';
import { storeToRefs } from 'pinia';
import { questionStore } from '@/stores';
import { QuestionType } from '@/constants';
import { getQuestionType } from '@/utils/array-helpers';

const emit = defineEmits(['hide-dialog'])

// store states
const { question } = storeToRefs(questionStore)
// component states
const questionTypeOption = getQuestionType();

// computed properties 
const hasOptions = computed(() => {
    return question.value.type === QuestionType.RADIO || question.value.type === QuestionType.CHECKBOX
})

onMounted(() => {
    // 
})

// Actions
</script>

<template>
    <div>
        <FormDialog header="Question Form" width="30vw" @hide-dialog="emit('hide - dialog')">
            <div class="p-fluid">
                <!-- Question Title Section -->
                <div class="formgrid grid">
                    <div class="field col">
                        <BaseTextInput v-model="question.title.english" label="Title" size="large" :errorMessage="null" />
                    </div>
                    <div class="field col">
                        <BaseTextInput v-model="question.title.nepali" label="Title (Nepali)" size="large"
                            :errorMessage="null" />
                    </div>
                </div>
                <!-- Question Description Section -->
                <div class="formgrid grid">
                    <div class="field col">
                        <BaseTextarea v-model="question.description.english" label="Description" />
                    </div>
                    <div class="field col">
                        <BaseTextarea v-model="question.description.nepali" label="Description (Nepali)" />
                    </div>
                </div>
                <!-- Question Type -->
                <div class="formgrid grid">
                    <div class="field col">
                        <BaseDropdown v-model="question.type" :options="questionTypeOption" label="Type"
                            :optionValue="'value'" placeholder="Select a question type" :showClear="false" />
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