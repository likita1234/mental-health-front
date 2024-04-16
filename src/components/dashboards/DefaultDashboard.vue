<template>
    <self-assessment-dashboard v-if="userRole === UserRole.USER" />
    <!-- Overall Dashboard -->
    <default-dashboard-skeleton v-else-if="isLoading" />
    <div v-else>
        <div class="card">
            <div class="card-header justify-content-center">
                <only-table-mode-selection />
            </div>
            <h4 class="text-center">{{ title }}</h4>
            <!-- <p class="text-center">{{ description }}</p> -->
            <Divider />
            <div v-if="metrics && metrics?.length > 0" class="grid">
                <metric-data v-for="metric in metrics" :metricId="metric.metricId" :key="metric.metricId"
                    class="col-12 md:col-6" />
                <!-- xl:col-4 -->
            </div>
        </div>
    </div>
</template>

<!-- At the moment there is no way to identify default dashboard so we need to preset the exact dashboard id -->
<script setup>
import DefaultDashboardSkeleton from '@/components/common/skeleton/default-dashboard.vue'
import SelfAssessmentDashboard from './self-assessment.vue';
import MetricData from '@/components/metric/MetricData.vue'

import { computed, onMounted, ref } from 'vue';
import { storeToRefs } from 'pinia';
import { authStore, dashboardStore, } from '@/stores'
import { UserRole } from '@/constants';
import AppError from '@/utils/app-error';

// Store states
const { userRole } = storeToRefs(authStore)

// Component states
const dashboard = ref(null)
const isLoading = ref(false)

// Computed properties
const title = computed(() => {
    return dashboard.value?.title
})

// const description = computed(() => {
//     return dashboard.value?.description
// })

const metrics = computed(() => {
    return dashboard.value?.metrics
})

onMounted(() => {
    if (userRole.value && userRole.value !== UserRole.USER) {
        loadDashboardDetails()
    }
})

// Actions
const loadDashboardDetails = async () => {
    try {
        isLoading.value = true
        // Set dashboard id hardcoded for now
        const dashboardId = "65f77004da281f65e8a3952e";
        dashboard.value = await dashboardStore.getDashboardDetails(dashboardId)
    } catch (error) {
        new AppError(400, 'Failed to load dashboard')
    }
    finally {
        isLoading.value = false
    }
}

</script>