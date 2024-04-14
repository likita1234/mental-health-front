<template>
    <div class="p-card my-2">
        <div>
            <h5 class="text-center">{{ title }}</h5>
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

const emit = defineEmits(['metric-data-loaded'])

// Props
const props = defineProps({
    metricId: {
        type: String,
        required: true
    },
    // In case this is true, data is emitted
    dataRequested: {
        type: Boolean,
        default: false
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
    // Check if data is requested, if yes then emit the data
    if (props.dataRequested) {
        emit('metric-data-loaded', metricDetails.value)
    }
}

</script>