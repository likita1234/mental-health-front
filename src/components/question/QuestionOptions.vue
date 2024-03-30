<script setup>
import QuestionOption from './QuestionOption.vue';
import { questionStore } from '@/stores';

const props = defineProps({
    options: {
        type: Array,
        required: true
    }
})

// actions
const addOption = () => {
    questionStore.addQuestionOption()
}

const removeOption = (id) => {
    questionStore.removeQuestionOption(id)
}

</script>

<template>
    <div>
        <div class="flex justify-content-center mb-2">
            <div>
                <Button label="Add an option" icon="pi pi-plus" iconPos="right" @click="addOption" />
            </div>
        </div>
        <Divider />
        <template v-if="options.length">
            <div v-for="option in options" :key="option.id" class="flex gap-2">
                <QuestionOption :option="option" />
                <div class="mt-4">
                    <Button icon="pi pi-trash" severity="danger" rounded aria-label="Remove Option"
                        @click="removeOption(option.id)" />
                </div>
            </div>
        </template>
        <template v-else>
            <div class="text-center">
                No options available
            </div>
        </template>
    </div>
</template>