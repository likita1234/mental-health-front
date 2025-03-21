<script setup>
import { onMounted, inject, onUnmounted, ref } from 'vue'
import { storeToRefs } from 'pinia'
import { useRouter } from 'vue-router'
import { formStore } from '@/stores'
import { AssessmentFormType } from '@/constants';

const props = defineProps({
    type: {
        type: String,
        default: 'public'
    }
})

const router = useRouter()
const loading = ref(false)
// Global states
const appState = inject('appState')

// Store states
const { allForms, params } = storeToRefs(formStore)

onMounted(() => {
    loadForms()
})

onUnmounted(() => {
    params.value = {}
})

// Load all available survey forms
const loadForms = async () => {
    try {         
        loading.value = true  
        // Insert the type of assessment form being fetched
        params.value = { type: props.type }
        await formStore.fetchAllForms()
    }finally{
        loading.value = false
    }
}

// Depending upon the selected survey form, redirect into the assessment form
const enterSurvey = (surveyId) => {
    const toRouteName = props.type === AssessmentFormType.PUBLIC ? 'survey-form' : 'self-assessment-form'
    router.push({ name: toRouteName, params: { id: surveyId } })

}

</script>


<template>
    <div class="flex justify-content-center">
        <div class="w-full lg:w-9 surface-section px-4 py-8 md:px-6 lg:px-8 text-center">
            <div class="font-bold text-3xl">
                <span v-if="type === AssessmentFormType.PUBLIC" class="text-blue-600">Ongoing Surveys </span>
                <span v-else class="text-green-600">Self Assessments </span>
            </div>
            <ProgressSpinner  v-if="loading"   class="flex mt-5" />
            <div v-if="allForms" class="flex justify-content-center flex-wrap">
                <div class="form-container col-12 md:col-4" v-for="form in allForms" :key="form.id"
                    @click="enterSurvey(form._id)">
                    <div class="card shadow-3 h-18rem p-2 overflow-hidden">
                        <span class="p-3 shadow-2 mb-3 inline-block surface-card" style="border-radius: 10px">
                            <font-awesome-icon :icon="['fas', 'brain']" size="3x" />
                        </span>
                        <div class="text-900 text-xl mb-2 font-bold text-primary">{{ form.title[appState.lang] }}</div>
                        <span class="text-700 line-height-3">
                            {{ form.description[appState.lang] ?? 'No Description' }}</span>
                    </div>
                </div>
            </div>
            <div v-else>
                <p>Sorry ! There are no ongoing surverys at the moment</p>
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