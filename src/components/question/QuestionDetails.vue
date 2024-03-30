<script setup>
import { ref, onMounted } from 'vue'
import { questionStore } from '@/stores'

const emit = defineEmits(['hide-dialog'])

const props = defineProps({
    id: {
        type: String,
        required: true
    }
})

const questionDetails = ref(null)

onMounted(() => {
    loadQuestionDetails()
})

const loadQuestionDetails = async () => {
    const questionId = props.id
    questionDetails.value = await questionStore.fetchQuestionDetails(questionId)
}

</script>

<template>
    <FormDialog :header="'Question Details'" width="30vw" @hide-dialog="emit('hide-dialog')" hideSubmission>
        <CustomQuestion v-if="questionDetails" :question="questionDetails" />
        <template #cancel-label>
            Close
        </template>
    </FormDialog>
</template>