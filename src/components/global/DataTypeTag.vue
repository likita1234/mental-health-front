<script setup>
import { AssessmentFormType, QuestionType } from '@/constants';

import { computed } from 'vue'

const props = defineProps({
    entity: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    }
})

// Get severity on based on type
const severityType = computed(() => {
    switch (props.entity) {
        case 'question':
            return selectQuestionWise()
        case 'form':
            return props.type === AssessmentFormType.PUBLIC ? 'info' : 'warning'
    }
})

// Actions

const selectQuestionWise = () => {
    switch (props.type) {
        case QuestionType.TEXT:
        case QuestionType.NUMBER:
        case QuestionType.RATINGS:
            return 'success'

        case QuestionType.DROPDOWN:
            return 'info'

        case QuestionType.RADIO:
            return 'warning'

        case QuestionType.CHECKBOX:
            return 'danger'

    }
}

</script>

<template>
    <div>
        <Tag :value="type" class="capitalize" :severity="severityType" />
    </div>
</template>