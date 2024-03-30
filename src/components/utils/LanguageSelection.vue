<script setup>
import { ref, onMounted, watch,inject } from 'vue'
import { getLanguages } from '@/utils/array-helpers';

// Global State
const appState = inject('appState')

// Component States
const languages = getLanguages()
const selectedLanguage = ref(null)

// Watchers
watch(selectedLanguage, () => {
    appState.lang = selectedLanguage.value
})

onMounted(() => {
    if (appState.lang) {
        selectedLanguage.value = appState.lang
    }
})
</script>

<template>
    <div>
        <BaseDropdown v-model="selectedLanguage" :options="languages" optionValue="value"
            placeholder="Select a language" :showClear="false" />
    </div>
</template>