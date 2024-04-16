<script setup>
import AssessmentSections from './AssessmentSections.vue';

import { ref, computed, onMounted, onUnmounted } from 'vue';
import { storeToRefs } from 'pinia';
import { formStore, formErrorStore, sectionStore } from '@/stores';
import { AssessmentFormSchema, handleValidation } from '@/validations/schemas';
import { getAssessmentFormType } from '@/utils/array-helpers';

const emit = defineEmits(['hide-dialog'])
const props = defineProps({
    editMode: {
        type: Boolean,
        default: false
    }
})

// store states
const { form } = storeToRefs(formStore)
const { formErrors } = storeToRefs(formErrorStore)
// component states
const loading = ref(false)
const formTypeOptions = getAssessmentFormType()

// computed properties 
const formHeader = computed(() => {
    return props.editMode ? 'Update Assessment Form' : 'Add new Assessment Form'
})

// Initial Events
onMounted(() => {
    loadSections()
})

onUnmounted(() => {
    // Reset params in formError store
    formErrorStore.clearErrors()
})

// Actions
const loadSections = async () => {
    await sectionStore.fetchAllSections(true)
}

const submit = async () => {
    loading.value = true
    // 1) Validate assessment form
    const validated = await handleValidation(form.value, AssessmentFormSchema)
    // 2) If validated is true, then submit, 
    if (validated) {
        // If its edit mode then update the form details otherwise submit the question
        const submitted = props.editMode ? await formStore.updateFormDetails() : await formStore.addForm()
        // 3) If successful, then close dialog
        if (submitted) {
            emit('hide-dialog')
        }

    }
    loading.value = false
}

const hideDialog = () => {
    emit('hide-dialog')
    formStore.initFormData()
}
</script>

<template>
    <div>
        <FormDialog :header="formHeader" width="60vw" @hide-dialog="hideDialog" @submit.preventDefault()="submit">
            <div class="p-fluid">
                <!-- Assessment Form Title Section -->
                <div class="formgrid grid">
                    <div class="field col">
                        <BaseTextInput v-model="form.title.english" label="Title"
                            :errorMessage="formErrors['title.english']" />
                    </div>
                    <div class="field col">
                        <BaseTextInput v-model="form.title.nepali" label="Title (Nepali)"
                            :errorMessage="formErrors['title.nepali']" />
                    </div>
                </div>
                <!-- Assessment Form Description Section -->
                <div class="formgrid grid">
                    <div class="field col">
                        <BaseTextarea v-model="form.description.english" label="Description"
                            :errorMessage="formErrors['description.english']" />
                    </div>
                    <div class="field col">
                        <BaseTextarea v-model="form.description.nepali" label="Description (Nepali)"
                            :errorMessage="formErrors['description.nepali']" />
                    </div>
                </div>
                <!-- Form Type -->
                <div class="formgrid grid">
                    <div class="field col">
                        <BaseDropdown v-model="form.type" :options="formTypeOptions" label="Form Type"
                            :optionValue="'value'" placeholder="Select form type" :showClear="false"
                            :errorMessage="formErrors.type" />
                    </div>
                </div>
                <!-- Sections List -->
                <template v-if="form.sections && form.sections.length > 0">
                    <AssessmentSections :sections="form.sections" />
                </template>
            </div>
        </FormDialog>
    </div>
</template>