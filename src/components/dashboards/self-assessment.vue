<script setup>
import { ref, onMounted } from 'vue';
import { dashboardStore } from '@/stores';

// const actualTitles = ref([])
const overallData = ref(null)
const testData = ref(null)

onMounted(() => {
    loadDashboardData()
})

const loadDashboardData = async () => {
    const userId = '20240408_195203_238'
    const { allTitles, data, total } = await dashboardStore.getPersonalSubmissionAnalysisData(userId)
    overallData.value = data
    testData.value = overallData.value[0]
    console.log(allTitles)
    console.log(overallData.value)
}
</script>


<template>
    <div>
        <!-- {{ allTitles }} -->
        {{ testData }}
    </div>
</template>
