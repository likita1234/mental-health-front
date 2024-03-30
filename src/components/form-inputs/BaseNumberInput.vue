<template>
    <div class="flex flex-column">
        <label v-if="label" class="mb-2" :for="label">{{ label }}</label>
        <InputNumber v-model="selectedValue" :useGrouping="useGrouping" :placeholder="placeholder" :disabled="disabled"
            @input="updateSelectedValue($event.value)" />
    </div>
</template>
<script setup>
import { ref, watch, computed } from 'vue';
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
});

// state
const selectedValue = ref(null);

//computed properties
const inputValue = computed(() => {
    return props.modelValue;
});

// watches for modelValue changes
watch(inputValue, () => {
    selectedValue.value = inputValue.value;
});

const updateSelectedValue = (event) => {
    emit('update:modelValue', event);
};
</script>
