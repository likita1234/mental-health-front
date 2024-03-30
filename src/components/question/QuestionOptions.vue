<script setup>
import QuestionOption from './QuestionOption.vue';
import { questionStore, } from '@/stores';

// Props
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

const removeOption = (keyIndex) => {
    questionStore.removeQuestionOption(keyIndex)
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
            <div class="flex justify-content-center">
                <div class="flex flex-column gap-3">
                    <QuestionOption v-for="option, keyIndex in options" :key="option.id" :option="option"
                        :keyIndex="keyIndex" @remove-option="removeOption" />
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