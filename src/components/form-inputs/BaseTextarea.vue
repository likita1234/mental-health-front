<script setup>
import { ref, onMounted, watch } from 'vue'

const emit = defineEmits(['update:modelValue'])

const props = defineProps({
    modelValue: {
        type: String
    },
    label: {
        type: String
    },
    rows: {
        type: Number,
        default: 5
    },
    cols: {
        type: Number,
        default: 30
    },
    errorMessage: {
        type: String
    },
})

const inputValue = ref(null)

watch(inputValue, () => {
    emit('update:modelValue', inputValue.value)
})

onMounted(() => {
    if (props.modelValue) {
        inputValue.value = props.modelValue
    }
})
</script>

<template>
    <div class="flex flex-column gap-2">
        <label for="username">{{ label }}</label>
        <Textarea v-model="inputValue" :rows="rows" :cols="cols" />
        <small class="p-error" id="text-error">{{ errorMessage || '&nbsp;' }}</small>
    </div>
</template>
