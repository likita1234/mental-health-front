<template>
    <div class="card">
        <div id="card-header" class="order-tabs">
            <h5 class="text-center">{{ title }}</h5>
        </div>
        <div class="card-body">
            <base-chart :type="type" :jsonData="jsonData" />
        </div>
    </div>
</template>

<script setup>
import { onMounted, ref, computed } from 'vue';
import { metricStore } from '@/stores';

// Props
const props = defineProps({
    metricId: {
        type: String,
        required: true
    }
})

// Component states
const metricDetails = ref(null)

// Computed properties
const title = computed(() => {
    return metricDetails.value?.title
})

const type = computed(() => {
    return metricDetails.value?.chartType
})

// Returns the json data inside the metricDetails
const jsonData = computed(() => {
    return metricDetails.value?.metricData?.data ?? null;
})

onMounted(() => {
    loadMetricData()
})

// Actions
const loadMetricData = async () => {
    metricDetails.value = await metricStore.getMetricData(props.metricId)
}

</script>