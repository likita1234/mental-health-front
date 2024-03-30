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

// Computed properties
const title = computed(() => {
    return metricData.value?.title
})

const type = computed(() => {
    return metricData.value?.chartType
})

const data = computed(() => {
    return metricData.value?.metricData?.data ?? []
})

onMounted(() => {
    loadMetricData()
})

// Actions

const loadMetricData = async () => {
    metricData.value = await metricStore.getMetricData(props.metricId)
}

</script>