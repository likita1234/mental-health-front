<script setup>
import { ref, onMounted, computed, watch } from 'vue'
import { storeToRefs } from 'pinia'

import { sectionStore } from '@/stores'

const emit = defineEmits(['update:modelValue'])

const props = defineProps({
    modelValue: {
        type: String,
    },
    sectionFilters: {
        type: Array,
        default: []
    }
})

// Store states
const { allSections } = storeToRefs(sectionStore)

// Component States
const selectedSection = ref(null)

// Computed properties
const filteredSections = computed(() => {
    return props.sectionFilters?.length > 0 ? allSections.value.filter(section => props.sectionFilters.includes(section._id)) : allSections.value
})

watch(() => props.modelValue, () => {
    selectedSection.value = props.modelValue
})

onMounted(() => {
    selectedSection.value = props.modelValue
    loadSections()
})

// Actions
// At the moment sections are very limited so we are not utilizing any parameters
const loadSections = async () => {
    await sectionStore.fetchAllSections(true)
}

</script>

<template>
    <BaseDropdown v-model="selectedSection" label="Select a section" :options="filteredSections"
        :optionLabel="'title.' + [appState.lang]" optionValue="_id" placeholder="Choose an option"
        @change="emit('update:modelValue', $event)" />
</template>