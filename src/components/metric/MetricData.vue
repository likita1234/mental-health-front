<template>
    <div class="p-card my-2">
        <div class="text-center">
            <h5>{{ title }}</h5>
            <Divider />
        </div>
        <div class="card-body">
            <base-chart :type="type" :groupBy="defaultGroupings" :jsonData="jsonData" />
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
    return metricDetails.value?.metricData?.data?.data ?? metricDetails.value?.metricData?.data?.filter(dataObj => dataObj.label !== 'Unknown') ?? [];
})

const defaultGroupings = computed(() => {
    return metricDetails.value?.metricData?.labels ?? metricDetails.value?.metricData?.data?.labels ?? []
})

onMounted(() => {
    loadMetricData()
})

// Actions
const loadMetricData = async () => {
    metricDetails.value = await metricStore.getMetricData(props.metricId)
    console.log(metricDetails.value.metricData)
}

</script>