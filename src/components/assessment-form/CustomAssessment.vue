<script setup>
import CustomSection from '../section/components/CustomSection.vue'

import { ref, onMounted, computed, inject } from 'vue'
import { formStore } from '@/stores'
// import { storeToRefs } from 'pinia';

const props = defineProps({
    id: String
})

// 
const appState = inject('appState')
// Store states
// const {}

// Component states
const formDetails = ref(null)
const loading = ref(false)
// Steps
const activeStep = ref(0) //starts with index 0
// const steps = ref(null)

// Computed properties
const formTitle = computed(() => {
    return formDetails.value?.title[appState.lang]
})

const formDescription = computed(() => {
    return formDetails.value?.description[appState.lang]
})

const hasPreviousStep = computed(() => {
    return activeStep.value !== 0
})

const hasNextStep = computed(() => {
    return (activeStep.value + 1) < sections.value?.length
})

// Returns formatted list of section on the basis of order
// Later this order will represent each step
const sections = computed(() => {
    return formDetails.value?.sections?.map(sectionObj => {
        return {
            order: sectionObj.order,
            ...sectionObj.sectionId,
        }
    })
})

const activeSection = computed(() => {
    return sections.value?.find(sectionObj => sectionObj.order === activeStep.value + 1)
})

const sectionItems = computed(() => {
    let items = []
    for (let i = 0; i < sections.value?.length; i++) {
        items.push({ label: 'Section ' + (i + 1) })
    }
    return items
})

const sectionLoaded = computed(() => {
    return !loading.value && activeSection.value !== null
})

onMounted(() => {
    loadFormDetails()
})

// Actions
const loadFormDetails = async () => {
    loading.value = true
    const formId = props.id
    formDetails.value = await formStore.fetchFormDetails(formId)
    loading.value = false
}

// Navigate the steps
const toggleStep = (stepFlag) => {
    stepFlag ? activeStep.value++ : activeStep.value--
    // Scroll window
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

</script>

<template>
    <div class="flex justify-content-center">
        <div class="card p-5 h-full w-9">
            <div v-show="sectionLoaded">
                <!-- Form Title -->
                <h2 class="text-center">{{ formTitle }}</h2>
                <!-- Form Description -->
                <p>{{ formDescription }}</p>
                <Divider />

                <div v-if="sectionItems.length">
                    <Steps v-model:activeStep="activeStep" :model="sectionItems" class="custom-steps">
                        <template #item="{ item, active }">
                            <span class="border-primary border-1 p-1 cursor-pointer"
                                :class="{ 'bg-primary': active, 'surface-overlay text-primary': !active }">
                                {{ item.label }}
                            </span>
                        </template>
                    </Steps>
                </div>
                <Divider />
                <!-- <Divider /> -->
                <!-- Sections -->
                <!-- {{ sectionItems }} -->
                <div v-if="activeSection">
                    <!-- Steps of Each section -->
                    <CustomSection :section="activeSection" />
                </div>
                <Divider />
                <div class="flex mb-2 gap-2 justify-content-between">
                    <Button @click="toggleStep(false)" label="Previous" :disabled="!hasPreviousStep" />
                    <Button @click="toggleStep(true)" label="Next" :disabled="!hasNextStep" />
                </div>
            </div>
        </div>
    </div>
</template>