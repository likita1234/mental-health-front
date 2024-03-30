<script setup>
import AssessmentSection from './AssessmentSection.vue';
import { formStore } from '@/stores';

// Props
const props = defineProps({
    sections: {
        type: Array,
        required: true
    }
})

// actions
const addSection = () => {
    formStore.addFormSection()
}

const removeSection = (keyIndex) => {
    formStore.removeFormSection(keyIndex)
}

</script>

<template>
    <div>
        <div class="flex justify-content-center mb-2">
            <div>
                <Button label="Add a section" icon="pi pi-plus" iconPos="right" @click="addSection" />
            </div>
        </div>
        <Divider />
        <div class="flex justify-content-center">
            <div class="flex flex-column gap-3">
                <AssessmentSection v-for="section, keyIndex in sections" :key="keyIndex" :section="section"
                    :keyIndex="keyIndex" @remove-section="removeSection" />
            </div>
        </div>
    </div>
</template>