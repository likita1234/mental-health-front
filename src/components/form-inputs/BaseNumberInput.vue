<template>
    <div class="flex flex-column">
        <label v-if="label" class="mb-2" :for="label">{{ label }}</label>
        <InputNumber v-model="selectedValue" :useGrouping="props.useGrouping" :placeholder="'Type ' + label" :disabled="props.disabled" @input="updateSelectedValue($event.value)" />
    </div>
</template>
<script setup>
import { ref, defineProps, watch, computed, defineEmits } from 'vue';
const emit = defineEmits(['update:modelValue']);
const props = defineProps({
    modelValue: {
        type: Number,
    },
    label: {
        type: String,
    },
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
