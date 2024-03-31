<script setup>
import { ref, onMounted, watch, } from 'vue'
import { storeToRefs } from 'pinia'

import { sectionStore } from '@/stores'

const emit = defineEmits(['section-selected'])

// Store states
const { allSections } = storeToRefs(sectionStore)

// Component States
const selectedSection = ref(null)

// Watchers for analysis of section selection 
watch(() => selectedSection.value, () => {
    if (selectedSection.value) {
        const sectionDetails = allSections.value.find(section => section._id === selectedSection.value)
        emit('section-selected', sectionDetails?._id)
    }
})

onMounted(() => {
    loadSections()
})

// Actions
// At the moment sections are very limited so we are not utilizing any parameters
const loadSections = async () => {
    // Check if allSections already have value, if yes then no need to make another request
    if (allSections.value && allSections.value?.length <= 0) {
        await sectionStore.fetchAllSections()
    }
}
</script>

<template>
    <div>
        <BaseDropdown v-model="selectedSection" :label="'Now Pick a section'" :options="allSections"
            optionLabel="engTitle" optionValue="_id" placeholder="Select a section" :showClear="false" />
    </div>
</template>