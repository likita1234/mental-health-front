<script setup>
import AssessmentFormSelection from '@/components/common/dropdowns/assessment-form-selection.vue'
import QuestionSelection from '@/components/common/dropdowns/question-selection.vue'
import { ref } from 'vue';
import { showToast } from '@/utils/show-toast';
import { QuestionType } from '@/constants'

// Events
const emit = defineEmits(['form-question-selected', 'hide-dialog'])

// Component states
const selectedForm = ref(null)
const selectedQuestion = ref(null)
const questionParams = ref({ type: QuestionType.LONGTEXT }) // We need only long text types so

// Actions
const submit = () => {
    if (checkValid()) {
        const selectedInfo = { formId: selectedForm, questionId: selectedQuestion.value }
        emit('form-question-selected', selectedInfo)
    }
}
const checkValid = () => {
    if (!selectedForm.value || !selectedQuestion.value) {
        showToast('info', null, 'Please select both form and question')
        return false
    }
    return true
}

</script>

<template>
    <div>
        <FormDialog header="Assessment and Question Selection" width="30vw" @hide-dialog=" emit('hide-dialog')"
            @submit.preventDefault()="submit">
            <div class="flex gap-2 flex-wrap">
                <assessment-form-selection @form-selected="selectedForm = $event" />
                <question-selection :params="questionParams" @question-selected="selectedQuestion = $event" />
            </div>
        </FormDialog>
    </div>
</template>