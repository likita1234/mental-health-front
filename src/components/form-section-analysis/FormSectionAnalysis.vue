<script setup>
import FormSectionSelectionDialog from '@/components/common/dialogs/form-section-selection.vue'
import { ref, computed } from 'vue';

// Component states
const dialogVisible = ref(false)
const analysisIds = ref(null)

// Computed Properties
const hasAnalysisIds = computed(() => {
    return analysisIds.value?.formId !== null && analysisIds.value?.sectionId !== null
})

// Actions
const analysisDataSelected = (event) => {
    const { formId, sectionId } = event
    analysisIds.value = { formId, sectionId }
    toggleDialog(false)
}

const toggleDialog = (flag) => {
    dialogVisible.value = flag
}

</script>

<template>
    <div>
        <div class="flex justify-content-around">
            <Button label="Choose Assessment Form and Section" @click="toggleDialog(true)" />
        </div>
        <!-- Dialog for form and section selection -->
        <form-section-selection-dialog v-if="dialogVisible" @form-section-selected="analysisDataSelected"
            @hide-dialog="toggleDialog(false)" />


    </div>
</template>