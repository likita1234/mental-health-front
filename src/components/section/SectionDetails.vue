<script setup>
import CustomSection from './components/CustomSection.vue'

import { ref, onMounted } from 'vue'
import { sectionStore } from '@/stores'

const emit = defineEmits(['hide-dialog'])
const props = defineProps({
    id: {
        type: String,
        required: true
    }
})

const section = ref(null)
const loading = ref(false)

onMounted(() => {
    loadSectionDetails()
})

const loadSectionDetails = async () => {
    loading.value = true
    const sectionId = props.id
    section.value = await sectionStore.fetchSectionDetails(sectionId)
    console.log(section.value)
    loading.value = false
}

</script>

<template>
    <FormDialog :header="'Section Details'" width="40vw" @hide-dialog="emit('hide-dialog')" hideSubmission>
        <CustomSection v-if="section" :section="section" />
        <template #cancel-label>
            Close
        </template>
    </FormDialog>
</template>