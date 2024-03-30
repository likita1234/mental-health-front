<script setup>
import { ref, computed, watch } from 'vue'

const emit = defineEmits(['update:modelValue'])

const props = defineProps({
    modelValue: Number,
    label: String,
    description: String,
    stars: {
        type: Number,
        default: 5
    },
    cancel: {
        type: Boolean,
        default: false
    },
    readOnly: {
        type: Boolean,
        default: false
    }
})

const value = ref(null)

const propsModelValue = computed(() => {
    return props.modelValue
})

watch(() => propsModelValue.value, () => {
    value.value = props.modelValue
})

</script>

<template>
    <div class="flex flex-column gap-3">
        <label :for="label">{{ label }}</label>
        <div class="flex justify-content-center">
            <Rating :id="label" v-model="value" :stars="stars" :cancel="cancel" :readOnly="readOnly"
                @change="emit('update:modelValue', value)">
                <!-- <template #cancelicon>
                    <img src="/images/icons/cancel.png" height="24" width="24" />
                </template>

                <template #onicon>
                    <img src="/images/icons/custom-officon.png" height="24" width="24" />
                </template>

                <template #officon>
                    <img src="/images/icons/custom-onicon.png" height="24" width="24" />
                </template> -->
            </Rating>
        </div>
        <div class="text-center">
            {{ description }}
        </div>
    </div>
</template>