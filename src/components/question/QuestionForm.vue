<script setup>
import { ref, computed, onMounted } from 'vue';
import { getLanguages, getQuestionType } from '@/utils/array-helpers';
import { LanguageType } from '@/constants';

const emit = defineEmits(['hide-dialog'])

const languages = getLanguages()
// component states
const selectedQuestionType = ref(null)
const questionTypeOption = getQuestionType();
const activeLanguage = ref(null)
const form = ref({
    title: {
        english: null,
        nepali: null
    },
    description: {
        english: null,
        nepali: null
    }
})
// computed properties 
const englishMode = computed(() => {
    return activeLanguage.value === LanguageType.ENGLISH
})

onMounted(() => {
    // Set active language to English by default
    activeLanguage.value = LanguageType.ENGLISH
})


</script>

<template>
    <div>
        <FormDialog header="Question Form" width="30vw" @hide-dialog="emit('hide - dialog')">
            <div class="flex justify-content-center mb-3">
                <SelectButton v-model="activeLanguage" :options="languages" optionLabel="name" optionValue="value"
                    aria-labelledby="basic" binary />
            </div>
            <template v-if="englishMode">
                <div class="p-fluid">
                    <!-- Question Title Section -->
                    <div class="formgrid grid">
                        <div class="field col">
                            <BaseTextInput v-model="form.title.english" label="Question Title" size="large"
                                :errorMessage="null" />
                        </div>
                    </div>
                    <!-- Question Description Section -->
                    <div class="formgrid grid">
                        <div class="field col">
                            <BaseTextarea v-model="form.description.english" label="Question Description" />
                        </div>
                    </div>
                    <!-- Question Type -->
                    <div class="formgrid grid">
                        <div class="field col">
                            <BaseDropdown v-model="selectedQuestionType" :options="questionTypeOption" label="Type"
                                optionLabel="name" optionValue="id" placeholder="Select a question type"
                                :showClear="false" />
                        </div>
                    </div>
                </div>
            </template>
            <template v-else>
                <div class="p-fluid">
                    <!-- Question Title Section -->
                    <div class="formgrid grid">
                        <div class="field col">
                            <BaseTextInput v-model="form.title.nepali" label="प्रश्न शीर्षक" size="large"
                                :errorMessage="null" />
                        </div>
                    </div>
                    <!-- Question Description Section -->
                    <div class="formgrid grid">
                        <div class="field col">
                            <BaseTextarea v-model="form.description.nepali" label="प्रश्न विवरण" />
                        </div>
                    </div>
                    <!-- Question Type -->
                    <div class="formgrid grid">
                        <div class="field col">
                            <BaseDropdown v-model="selectedQuestionType" :options="questionTypeOption" label="Type"
                                optionLabel="name" optionValue="id" placeholder="Select a question type"
                                :showClear="false" />
                        </div>
                    </div>
                </div>
            </template>
        </FormDialog>
    </div>
</template>