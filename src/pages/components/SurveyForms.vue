<script setup>
import { onMounted, inject } from 'vue'
import { storeToRefs } from 'pinia'
import { useRouter } from 'vue-router'

import { formStore } from '@/stores'

const router = useRouter()
// Global states
const appState = inject('appState')

// Store states
const { allForms } = storeToRefs(formStore)

onMounted(() => {
    loadForms()
})

// Load all available survey forms
const loadForms = async () => {
    await formStore.fetchSurveyForms()
}

// Depending upon the selected survey form, redirect into the assessment form
const enterSurvey = (surveyId) => {
    router.push({ name: 'survey-form', params: { id: surveyId } })
}

</script>


<template>
    <div class="flex justify-content-center">
        <div class="w-full lg:w-9 surface-section px-4 py-8 md:px-6 lg:px-8 text-center">
            <div class="font-bold text-3xl">
                <span class="text-blue-600">Ongoing Surveys </span>
            </div>
            <div class="flex justify-content-center flex-wrap">
                <div class="form-container col-12 md:col-6 overflow-hidden" v-for="form in allForms" :key="form.id"
                    @click="enterSurvey(form._id)">
                    <div class="card shadow-3 h-18rem">
                        <span class="p-3 shadow-2 mb-3 inline-block surface-card" style="border-radius: 10px">
                            <font-awesome-icon :icon="['fas', 'brain']" size="3x" />
                        </span>
                        <div class="text-900 text-xl mb-3 font-bold text-primary">{{ form.title[appState.lang] }}</div>
                        <span class="text-700 line-height-3">{{ form.description[appState.lang] }}</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>


<style lang="scss" scoped>
.form-container {
    padding: 20px;
    transition: all 0.4s ease-in-out;
    &:hover {
        transform: translateY(-10px);
        cursor: pointer;
    }
}
</style>