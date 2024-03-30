<script setup>
import { onMounted, inject } from 'vue'
import { storeToRefs } from 'pinia'

import { formStore } from '@/stores'

// Global states
const appState = inject('appState')

// Store states
const { activeForms } = storeToRefs(formStore)

// Component states

onMounted(() => {
    loadForms()
})

// Load all available survey forms
const loadForms = async () => {
    await formStore.fetchAllForms()
}

</script>
<template>
    <div class="flex justify-content-center">
        <div class="w-8 surface-section px-4 py-8 md:px-6 lg:px-8 text-center">
            <div class="mb-6 font-bold text-3xl">
                <span class="text-blue-600">Ongoing Surveys </span>
            </div>
            <!-- <div class="text-700 mb-6">Please feel free to contribute to any of them.</div> -->
            <div class="grid mt-4 justify-content-center">
                <div class="card shadow-3 col-12 md:col-4 mb-4 form-container" v-for="form in activeForms"
                    :key="form.id">
                    <span class="p-3 shadow-2 mb-3 inline-block surface-card" style="border-radius: 10px">
                        <font-awesome-icon :icon="['fas', 'brain']" size="3x" />
                    </span>
                    <div class="text-900 text-xl mb-3 font-bold text-primary">{{ form.title[appState.lang] }}</div>
                    <span class="text-700 line-height-3">{{ form.description[appState.lang] }}</span>
                    <!-- Understanding the Spectrum: Mental Health Assessment Resources. -->
                </div>
            </div>
        </div>
    </div>
</template>


<style lang="scss" scoped>
.form-container {
    height: 100%;
    color: #334155;
    background: #ffffff;
    box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px -1px rgba(0, 0, 0, 0.1);
    border-radius: 10px;
    padding: 20px;
    transition: all 0.4s ease-in-out;

    &:hover {
        transform: translateY(-10px);
        cursor: pointer;
    }
}
</style>