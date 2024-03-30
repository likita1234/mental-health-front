<script setup>
import CustomQuestion from '@/components/question/components/CustomQuestion.vue'
import { computed, inject } from 'vue'

const props = defineProps({
    section: {
        type: Object,
        required: true
    }
})

const appState = inject('appState')

const title = computed(() => {
    return props.section?.title[appState.lang]
})

const description = computed(() => {
    return props.section?.description[appState.lang]
})

const questions = computed(() => {
    return props.section?.questions?.map(questionObj => {
        return {
            order: questionObj.order,
            ...questionObj.questionId
        }
    })
})

</script>

<template>
    <div>
        <div class="flex flex-column justify-content-center align-items-center gap-3">
            <!-- Section Title Here -->
            <h4>{{ title }}</h4>
            <!-- Section Description Here -->
            <p v-if="description">{{ description }}</p>
        </div>
        <!-- Section Questions Here -->
        <CustomQuestion v-for="question in questions" :question="question" :key="question._id" />
    </div>
</template>