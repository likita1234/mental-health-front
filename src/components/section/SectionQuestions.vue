<script setup>
import SectionQuestion from './SectionQuestion.vue';
import { sectionStore } from '@/stores';

// Props
const props = defineProps({
    questions: {
        type: Array,
        required: true
    }
})

// actions
const addQuestion = () => {
    sectionStore.addSectionQuestion()
}

const removeQuestion = (keyIndex) => {
    sectionStore.removeSectionQuestion(keyIndex)
}

</script>

<template>
    <div>
        <div class="flex justify-content-center mb-2">
            <div>
                <Button label="Add a question" icon="pi pi-plus" iconPos="right" @click="addQuestion" />
            </div>
        </div>
        <Divider />
        <div class="flex flex-column gap-3">
            <SectionQuestion v-for="question, keyIndex in questions" :key="keyIndex" :question="question"
                :keyIndex="keyIndex" @remove-question="removeQuestion" />
        </div>
    </div>
</template>