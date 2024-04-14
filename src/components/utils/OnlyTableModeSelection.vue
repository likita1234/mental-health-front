<script setup>
import { ref, onMounted, watch, inject, onUnmounted } from 'vue'

// Global State
const appState = inject('appState')

// Component States
const modes = [
    { name: 'All Charts', value: false },
    { name: 'Only Table', value: true },
]
const tableModeSelected = ref(null)

// Watchers
watch(tableModeSelected, () => {
    appState.tableMode = tableModeSelected.value
})

onMounted(() => {
    if (appState.tableMode) {
        tableModeSelected.value = appState.tableMode
    }
})

onUnmounted(()=>{
    appState.tableMode = false
})
</script>

<template>
    <div>
        <BaseDropdown v-model="tableModeSelected" :options="modes" optionValue="value" label="Data Visualization Mode"
            placeholder="Select an option" :showClear="false" />
    </div>
</template>