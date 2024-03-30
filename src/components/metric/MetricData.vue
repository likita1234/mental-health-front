<template>
    <div>
        {{ metricData }}
    </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';

import { metricStore } from '@/stores';

// Props
const props = defineProps({
    metricId: {
        type: String,
        required: true
    }
})

// Component states
const metricData = ref(null)

onMounted(() => {
    loadMetricData()
})

// Actions

const loadMetricData = async () => {
    metricData.value = await metricStore.getMetricData(props.metricId)
}

</script>