<script setup>
import { ref, onMounted, watch } from 'vue'

const emit = defineEmits(['update:modelValue'])

const props = defineProps({
    modelValue: {
        type: String
    },
    type: {
        type: String,
        default: 'text'
    },
    label: {
        type: String
    },
    errorMessage: {
        type: String
    },
    icon: {
        type: String
    },
    floatLabel: {
        type: Boolean,
        default: false
    },
    size: {
        type: String,
        default: null
    }
})

const inputValue = ref(null)

onMounted(() => {
    if (props.modelValue) {
        inputValue.value = props.modelValue
    }
})

watch(inputValue, () => {
    emit('update:modelValue', inputValue.value)
})

</script>

<template>
    <div v-if="floatLabel" class="flex flex-column gap-2">
        <span class="p-float-label " :class="{ 'p-input-icon-left': icon }">
            <i v-if="icon" :class="['pi', icon]" />
            <InputText :id="modelValue" v-model="inputValue" :type="type" :class="{ 'p-invalid': errorMessage }"
                aria-describedby="text-error" :size="size" :aria-invalid="errorMessage ? 'true' : 'false'"
                :aria-labelledby="modelValue + '-label'" />
            <label :for="modelValue">{{ label }}</label>
        </span>
        <small class="p-error" id="text-error">{{ errorMessage || '&nbsp;' }}</small>
        <span class="focus-input"></span>
    </div>
    <div v-else class="flex flex-column gap-2">
        <label :for="label">{{ label }}</label>
        <InputText :id="label" v-model="inputValue" :class="{ 'p-invalid': errorMessage }" aria-describedby="text-error"
            :size="size" :type="type" :aria-invalid="errorMessage ? 'true' : 'false'"
            :aria-labelledby="modelValue + '-label'" />
        <small class="p-error" id="text-error">{{ errorMessage || '&nbsp;' }}</small>
    </div>
</template>