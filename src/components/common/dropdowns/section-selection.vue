<script setup>
import { ref, onMounted, } from 'vue'
import { storeToRefs } from 'pinia'

import { sectionStore } from '@/stores'

const emit = defineEmits(['section-selected'])

// Store states
const { allSections } = storeToRefs(sectionStore)

// Component States
const selectedSection = ref(null)

onMounted(() => {
    loadSections()
})

// Actions
// At the moment sections are very limited so we are not utilizing any parameters
const loadSections = async () => {
    await sectionStore.fetchAllSections(true)
}
</script>

<template>
    <BaseDropdown v-model="selectedSection" label="Select a section" :options="allSections"
        :optionLabel="'title.' + [appState.lang]" optionValue="_id" placeholder="Choose an option"
        @change="emit('section-selected', $event)" />
</template>