<template>
    <div class="flex flex-column gap-2">
        <label v-if="label" :for="label">{{ label }}</label>
        <InputNumber v-model="inputVal" :useGrouping="useGrouping" :placeholder="placeholder" :disabled="disabled"
            :class="{ 'p-invalid': errorMessage }" aria-describedby="text-error" />
        <small class="p-error" id="text-error">{{ errorMessage || '&nbsp;' }}</small>
    </div>
</template>
<script setup>
import { ref, watch, onMounted } from 'vue';
const emit = defineEmits(['update:modelValue']);
const props = defineProps({
    modelValue: Number,
    label: String,
    placeholder: String,
    useGrouping: {
        type: Boolean,
        default: false,
    },
    disabled: {
        type: Boolean,
        default: false,
    },
    errorMessage: {
        type: String
    },
});

// state
const inputVal = ref(null);


onMounted(() => {
    if (props.modelValue) {
        inputVal.value = props.modelValue
    }
})

watch(inputVal, () => {
    emit('update:modelValue', inputVal.value);
})
</script>
