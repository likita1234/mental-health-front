<template>
    <div class="flex gap-2" :class="customStyle">
        <label :class="{ 'mb-2': customStyle === 'flex-column' }">{{ fieldLabel }}:</label>
        <!-- </div> -->
        <div class="flex flex-wrap gap-3">
            <div v-for="option in props.options" :key="option.id" class="flex align-items-center">
                <RadioButton v-if="props.radioType" v-model="selectedOption" :name="option.name" :value="option.value" @change="optionSwitched" :disabled="props.disabled" :id="option.name" />
                <Checkbox v-else v-model="selectedOption" :name="option.name" :value="option.value" @change="optionSwitched" :id="option.name" />
                <label :for="option.name" class="ml-2"> {{ option.name }} </label>
            </div>
        </div>
    </div>
</template>
<script setup>
import { ref, computed, onMounted, watch } from 'vue';

const emit = defineEmits(['update:modelValue']);
const props = defineProps({
    modelValue: {
        type: [Boolean, Number, String],
    },
    label: {
        type: String,
    },
    radioType: {
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

const fieldValue = computed(() => {
    return props.modelValue;
});

// state
const selectedOption = ref(null);

// computed properties
const fieldLabel = computed(() => {
    return props.label ?? null;
});

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
