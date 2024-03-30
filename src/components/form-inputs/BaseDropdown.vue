
<script setup>
import { ref, defineProps, defineEmits, onMounted, computed, watch } from 'vue';

const emit = defineEmits(['update:modelValue']);

const props = defineProps({
    modelValue: [Number, String],
    label: String,
    placeholder: String,
    options: Array,
    optionLabel: {
        type: String,
        default: 'name',
    },
    optionValue: {
        type: String,
        default: 'id',
    },
    errorMessage: String,

    disabled: {
        type: Boolean,
        default: false,
    },
    showClear: {
        type: Boolean,
        default: true,
    },
    bold: {
        type: Boolean,
        default: false,
    },
    filter: {
        type: Boolean,
        default: false,
    },
});

// computed properties
const fieldValue = computed(() => {
    return props.modelValue;
});

// state
const selectedOption = ref(null);

// computed properties
const fieldLabel = computed(() => {
    return props.label ?? null;
});

const fieldOptions = computed(() => {
    return props.options;
});

// watches for modelValue changes
watch(fieldValue, () => {
    updateSelectedOption();
});

onMounted(() => {
    updateSelectedOption();
});

const updateSelectedOption = () => {
    selectedOption.value = fieldValue.value;
};
</script>

<template>
    <div>
        <div class="flex flex-column">
            <label v-if="fieldLabel" class="mb-2" :class="{ 'font-bold': bold }" :for="fieldLabel">{{ fieldLabel }}:</label>
            <Dropdown :id="fieldLabel" v-model="selectedOption" :options="fieldOptions" :optionLabel="optionLabel"
                :optionValue="optionValue" :placeholder="placeholder" class="mb-1" :class="{ 'p-invalid': errorMessage }"
                :filter="filter" :showClear="showClear" @change="emit('update:modelValue', selectedOption)"
                :disabled="disabled" />
            <small class="p-invalid" v-if="errorMessage"> {{ errorMessage }}</small>
        </div>
    </div>
</template>
