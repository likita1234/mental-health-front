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
    <div class="grid grid-cols-4 gap-2">
        <!-- Option Label English-->
        <BaseTextInput v-model="option.title.english" label="Label"
            :errorMessage="formErrors[`options[${props.keyIndex}]` + '.title.english']" />
        <!-- Option Label Nepali -->
        <BaseTextInput v-model="option.title.nepali" label="Label (Nepali)"
            :errorMessage="formErrors[`options[${props.keyIndex}]` + '.title.nepali']" />
        <!-- Option Value -->
        <BaseNumberInput v-model="option.optionValue" label="Value"
            :errorMessage="formErrors[`options[${props.keyIndex}]` + '.optionValue']" />
        <div class="mt-4">
            <Button icon="pi pi-trash" severity="danger" rounded aria-label="Remove Option"
                @click="emit('remove-option', keyIndex)" />
        </div>
    </div>
</template>