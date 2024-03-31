<script setup>
import AssessmentFormSelection from '@/components/common/dropdowns/assessment-form-selection.vue'
import SectionSelection from '@/components/common/dropdowns/section-selection.vue'
import { ref } from 'vue';
import { showToast } from '@/utils/show-toast';

const emit = defineEmits(['form-section-selected', 'hide-dialog'])

// Component states
const selectedForm = ref(null)
const selectedSection = ref(null)
// Actions
const submit = () => {
    if (checkValid()) {
        const selectedInfo = { formId: selectedForm, sectionId: selectedSection.value }
        emit('form-section-selected', selectedInfo)
    }
}
const checkValid = () => {
    if (!selectedForm.value || !selectedSection.value) {
        showToast('info', null, 'Please select both form and section')
        return false
    }
    return true
}

</script>

<template>
    <div>
        <FormDialog header="Assessment and Section Selection" width="30vw" @hide-dialog=" emit('hide-dialog')"
            @submit.preventDefault()="submit">
            <div class="flex gap-2 flex-wrap">
                <assessment-form-selection @form-selected="selectedForm = $event" />
                <section-selection @section-selected="selectedSection = $event" />
            </div>
        </FormDialog>
    </div>
</template>