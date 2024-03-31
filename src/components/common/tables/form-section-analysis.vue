<script setup>

const props = defineProps({
    analysisIds: {
        type: Object,
        required: true
    }
})
</script>

<template>
    <div>
        Yo
        {{ analysisIds }}
    </div>
</template>