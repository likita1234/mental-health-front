<template>
    <div class="flex flex-column">
        <label v-if="calendarLabel" :for="calendarLabel" class="mb-2" :class="{ 'font-bold': bold }">{{ calendarLabel
        }}:</label>
        <Calendar :id="calendarLabel" class="mb-1" :class="{ 'p-invalid': props.errorMessage }"
            :manualInput="props.manualInput" :minDate="props.minDate" :maxDate="props.maxDate" :showIcon="true"
            :showButtonBar="true" v-model="selectedDate" :dateFormat="props.dateFormat" :disabled="props.disabled"
            @date-select="emit('update:modelValue', formatRequestDate(selectedDate))"
            @input="emit('update:modelValue', formatRequestDate(selectedDate))" />
        <small class="p-invalid" v-if="props.errorMessage">{{ props.errorMessage }}</small>
    </div>
</template>

<script setup>
import { ref, onMounted, computed, watch } from 'vue';
import { formatDisplayDate, formatDisplayDateToRequestDate } from '@/utils/date-formatter';
const emit = defineEmits(['update:modelValue']);
const props = defineProps({
    modelValue: {
        type: [String, Date],
    },
    bold: {
        type: Boolean,
        default: false,
    },
    label: {
        type: String,
    },
    minDate: {
        type: [String, Date],
    },
    maxDate: {
        type: [String, Date],
    },
    manualInput: {
        type: Boolean,
        default: false,
    },
    dateFormat: {
        type: String,
        default: 'dd-mm-yy',
    },
    errorMessage: {
        type: String,
    },
    disabled: {
        type: Boolean,
        default: false,
    },
});

const selectedDate = ref(null);

// computed properties
const calendarLabel = computed(() => {
    return props.label ? props.label : null;
});

const propsDateValue = computed(() => {
    return props.modelValue;
});

onMounted(() => {
    setDateValue();
});

watch(propsDateValue, () => {
    setDateValue();
});

const setDateValue = () => {
    if (props.modelValue) {
        selectedDate.value = formatDisplayDate(props.modelValue);
        updateDate();
    } else {
        selectedDate.value = null;
    }
};
const updateDate = () => {
    const requestDate = formatDisplayDateToRequestDate(selectedDate.value);
    emit('update:modelValue', requestDate);
};
</script>
