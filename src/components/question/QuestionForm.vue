<script setup>
import { QuestionTypes } from '@/constants';
import { ref } from 'vue';

const emit = defineEmits(['hide-dialog'])

// component states
const visible = ref(true)
const form = ref({
    title: {
        english: null,
        nepalese: null
    },
    description: {
        english: null,
        nepalese: null
    }
})
const selectedQuestionType = ref(null)
</script>

<template>
    <div>
        <Dialog v-model:visible="visible" modal header="Header" :style="{ width: '50vw' }"
            :breakpoints="{ '1199px': '60vw', '575px': '80vw' }" @hide="emit('hide-dialog')">
            <div class="col-12">
                <div class=" p-fluid">
                    <!-- Question Title Section -->
                    <div class="formgrid grid">
                        <div class="field col">
                            <BaseTextInput v-model="form.title.english" label="Question Title" size="large"
                                :errorMessage="null" />
                        </div>
                        <div class="field col">
                            <BaseTextInput v-model="form.title.nepalese" label="प्रश्न शीर्षक" size="large"
                                :errorMessage="null" />
                        </div>
                    </div>
                    <!-- Question Description Section -->
                    <div class="formgrid grid">
                        <div class="field col">
                            <BaseEditor v-model="form.description.english" label="Question Title" hideToolbar
                                size="large" />
                        </div>
                        <div class="field col">
                            <BaseEditor v-model="form.description.nepalese" label="प्रश्न विवरण" hideToolbar size="large" />
                        </div>
                    </div>
                    <!-- Question Type -->
                    <div class="formgrid grid">
                        <div class="field col">
                            <BaseDropdown v-model="selectedQuestionType" :options="QuestionTypes" optionLable="Type" />
                        </div>
                    </div>
                </div>
            </div>
        </Dialog>
    </div>
</template>