<template>
    <div class="p-fluid">
        <div class="flex flex-column">
            <label v-if="fieldLabel" class="mb-2" :class="{ 'font-bold': bold }" :for="fieldLabel">{{ fieldLabel }}:</label>
            <Autocomplete
                :id="fieldLabel"
                v-model="selectedValue"
                :suggestions="suggestions"
                :multiple="multiple"
                :optionLabel="optionLabel"
                :placeholder="placeholder"
                :dropdown="dropdown"
                :loading="loading"
                @item-select="itemSelected"
                @complete="itemCompleted"
                class="mb-1"
                :class="{ 'p-invalid': errorMessage }"
            />
            <small class="p-invalid" v-if="errorMessage"> {{ errorMessage }}</small>
        </div>
    </div>
</template>

<script setup>
import { ref, defineProps, defineEmits, onMounted, computed } from 'vue';

const emit = defineEmits(['item-select', 'complete']);

const props = defineProps({
    modelValue: String,
    label: String,
    placeholder: String,
    optionLabel: String,
    suggestions: Array,
    loading: Boolean,
    errorMessage: String,
    multiple: {
        type: Boolean,
        default: false,
    },
    bold: {
        type: Boolean,
        default: false,
    },
    dropdown: {
        type: Boolean,
        default: false,
    },
});

// state
const selectedValue = ref(null);

// computed properties
const fieldLabel = computed(() => {
    return props.label ?? null;
});

onMounted(() => {
    if (props.modelValue) {
        selectedValue.value = props.modelValue;
    }
});

const itemSelected = (data) => {
    emit('item-select', data.value);
};

const itemCompleted = (data) => {
    emit('complete', data.query);
};
</script>
