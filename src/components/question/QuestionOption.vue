<script setup>
import { storeToRefs } from 'pinia';
import { formErrorStore } from '@/stores';

const emit = defineEmits(['remove-option'])
const props = defineProps({
    keyIndex: {
        type: Number,
        required: true
    },
    option: {
        type: Object,
        required: true
    }
})

// Store states
const { formErrors } = storeToRefs(formErrorStore)

</script>


<template>
    <div class="grid grid-cols-2 gap-2">
        <!-- Option Name -->
        <BaseTextInput v-model="option.optionLabel" label="Option Name"
            :errorMessage="formErrors[`options[${props.keyIndex}]` + '.optionName']" />
        <!-- Option Value -->
        <BaseNumberInput v-model="option.optionValue" label="Value"
            :errorMessage="formErrors[`options[${props.keyIndex}]` + '.optionValue']" />
        <div class="mt-4">
            <Button icon="pi pi-trash" severity="danger" rounded aria-label="Remove Option"
                @click="emit('remove-option', keyIndex)" />
        </div>
    </div>
</template>