<script setup>
import SectionQuestions from './SectionQuestions.vue';

import { ref, computed, onMounted } from 'vue';
import { storeToRefs } from 'pinia';
import { sectionStore, formErrorStore, questionStore } from '@/stores';
import { SectionSchema, handleValidation } from '@/validations/schemas';

const emit = defineEmits(['hide-dialog'])
const props = defineProps({
    editMode: {
        type: Boolean,
        default: false
    }
})

// store states
const { section } = storeToRefs(sectionStore)
const { formErrors } = storeToRefs(formErrorStore)
// component states
const loading = ref(false)

// computed properties 
const formHeader = computed(() => {
    return props.editMode ? 'Update Section' : 'Add new Section'
})

// Initial Events
onMounted(() => {
    loadQuestions()
})

// Actions
const loadQuestions = async () => {
    await questionStore.fetchAllQuestions(true)
}

const submit = async () => {
    loading.value = true
    // 1) Validate question form
    const validated = await handleValidation(section.value, SectionSchema)
    console.log(formErrors.value)
    // 2) If validated is true, then submit, if there are issues in login, show invalid credentials toast
    if (validated) {
        // If its edit mode then update the question details otherwise submit the question
        const submitted = await sectionStore.addNewSection()
        // 3) If successful, then close dialog
        if (submitted) {
            emit('hide-dialog')
        }

    }
    loading.value = false
}

const hideDialog = () => {
    emit('hide-dialog')
    sectionStore.initSectionData()
}
</script>

<template>
    <div>
        <FormDialog :header="formHeader" width="60vw" @hide-dialog="hideDialog" @submit.preventDefault()="submit">
            <div class="p-fluid">
                <!-- Section Title Section -->
                <div class="formgrid grid">
                    <div class="field col">
                        <BaseTextInput v-model="section.title.english" label="Title"
                            :errorMessage="formErrors['title.english']" />
                    </div>
                    <div class="field col">
                        <BaseTextInput v-model="section.title.nepali" label="Title (Nepali)"
                            :errorMessage="formErrors['title.nepali']" />
                    </div>
                </div>
                <!-- Section Description Section -->
                <div class="formgrid grid">
                    <div class="field col">
                        <BaseTextarea v-model="section.description.english" label="Description"
                            :errorMessage="formErrors['description.english']" />
                    </div>
                    <div class="field col">
                        <BaseTextarea v-model="section.description.nepali" label="Description (Nepali)"
                            :errorMessage="formErrors['description.nepali']" />
                    </div>
                </div>
                <!-- Questions List -->
                <SectionQuestions :questions="section.questions" />
            </div>
        </FormDialog>
    </div>
</template>