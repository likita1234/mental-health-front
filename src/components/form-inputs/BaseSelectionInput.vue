<template>
    <div class="flex gap-2" :class="customStyle">
        <label :class="{ 'mb-2': customStyle === 'flex-column' }">{{ fieldLabel }}:</label>
        <div class="flex flex-column gap-3">
            <div v-for="option in options" :key="option" class="flex align-items-center">
                <RadioButton v-if="radio" v-model="selectedOption" :name="option.title[appState.lang]"
                    :value="option.optionValue" @change="optionSwitched" :disabled="disabled"
                    :id="option.title[appState.lang]" />
                <Checkbox v-else v-model="selectedOption" :name="option.title[appState.lang]"
                    :value="option.optionValue" @change="optionSwitched" :id="option.title[appState.lang]" />
                <label :for="option.name" class="ml-2"> {{ option.title[appState.lang] }} </label>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, computed, onMounted, watch, inject } from 'vue';

const emit = defineEmits(['update:modelValue']);
const props = defineProps({
    modelValue: {
        type: [Boolean, Number, String, Array],
    },
    label: {
        type: String,
    },
    radio: {
        type: Boolean,
        default: false,
    },
    options: {
        type: Array,
    },
    customStyle: {
        type: String,
        default: 'flex-column',
    },
    disabled: {
        type: Boolean,
        default: false,
    },
});

// state
const selectedOption = ref(null);
const appState = inject('appState')

// computed properties
const fieldLabel = computed(() => {
    return props.label ?? null;
});

const fieldValue = computed(() => {
    return props.modelValue;
});

// watchers
watch(fieldValue, () => {
    updateSelectedOption();
});

onMounted(() => {
    if (fieldValue.value) {
        updateSelectedOption();
    }
});

const updateSelectedOption = () => {
    selectedOption.value = fieldValue.value;
};

const optionSwitched = () => {
    emit('update:modelValue', selectedOption.value);
};
</script>
