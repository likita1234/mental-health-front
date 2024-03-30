<script setup>

const props = defineProps({
    option: {
        type: Object,
        required: true
    }
})

</script>


<template>
    <div class="flex gap-2">
        <div>
            <BaseTextInput v-model="option.optionLabel" label="Option Name" />
        </div>
        <div>
            <BaseNumberInput v-model="option.optionValue" label="Value" />
        </div>
    </div>
</template>