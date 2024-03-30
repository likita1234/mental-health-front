<script setup>
import { inject } from 'vue';
import { storeToRefs } from 'pinia';
import { sectionStore, formErrorStore } from '@/stores';

const emit = defineEmits(['remove-section'])
const props = defineProps({
    keyIndex: {
        type: Number,
        required: true
    },
    section: {
        type: Object,
        required: true
    }
})


const appState = inject('appState')

// Store states
const { allSections } = storeToRefs(sectionStore)
const { formErrors } = storeToRefs(formErrorStore)

</script>


<template>
    <div class="grid gap-2">
        <!-- Section Order -->
        <BaseNumberInput v-model="section.order" label="Order"
            :errorMessage="formErrors[`sections[${props.keyIndex}]` + '.order']" />
        <!-- Sections Selection Dropdown -->
        <BaseDropdown v-model="section.sectionId" :options="allSections" :label="'Section'"
            :placeholder="'Select a section'" :errorMessage="formErrors[`sections[${props.keyIndex}]` + '.sectionId']"
            :optionLabel="'title.' + [appState.lang]" :optionValue="'_id'" filter />
        <!-- Button to remove section -->
        <div class="mt-4">
            <Button icon="pi pi-trash" severity="danger" rounded aria-label="Remove section"
                @click="emit('remove-section', keyIndex)" />
        </div>
    </div>
</template>