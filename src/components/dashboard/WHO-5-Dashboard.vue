<template>
    <div class="layout-dashboard">
        <div class="flex justify-content-around flex-wrap">
            <div v-for="answerObj in aggregatedAnswers" class="col-12 md:col-6 xl:col-4">
                <div class="card overview-box">
                    <div class="text-center">
                        <h6>{{ answerObj.question }}</h6>
                    </div>
                    <Divider />
                    <div class="flex justify-content-around">
                        <div class="order-tab" data-label="Lowest Score" data-stroke="#00acac">
                            <h6>Lowest Score</h6>
                            <h3>{{ answerObj.lowest }}</h3>
                        </div>
                        <div class="order-tab order-tab-active" data-label="Average Score" data-stroke="#2f8ee5">
                            <h6>Average Score</h6>
                            <h3>{{ answerObj.average }}</h3>
                        </div>
                        <div class="order-tab" data-label="Highest Score" data-stroke="#4f8eff">
                            <h6>Highest Score</h6>
                            <h3>{{ answerObj.highest }}</h3>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- Main WHO-5 Dashboard -->
        <div class="col-12 h-full">
            <div class="card sale-graph">
                <div class="card-header">
                    <h4>{{ metricData?.title }}</h4>
                </div>
                <div class="overview-chart">
                    <base-chart :type="chartType" :groupBy="defaultGroupings" :jsonData="jsonData" />
                </div>
            </div>
        </div>
    </div>
</template>

<!-- This dashboard is specially for WHO-5 only so we will need to hard code the metric id here while fetching its details -->

<script setup>
import { ref, onMounted, computed } from 'vue';
import { metricStore, questionStore } from '@/stores'

// Here we will hardcode the metricId for WHO-5
const metricId = ref("65feedbbd213a25a0c31e2ba")
const metricData = ref(null)
const overallAnswersByQuestionId = ref([])
const aggregatedAnswers = ref([])

// Computed properties
const chartType = computed(() => {
    return metricData.value?.chartType
})

const defaultGroupings = computed(() => {
    return metricData.value?.metricData?.data?.labels ?? []
})

const jsonData = computed(() => {
    return metricData.value?.metricData?.data?.data ?? []
})

const overallAnswers = computed(() => {
    return metricData.value?.metricData?.answers
})

onMounted(() => {
    loadMetricData()
})

// Actions
const loadMetricData = async () => {
    metricData.value = await metricStore.getMetricData(metricId.value)
    // console.log(metricData.value)
    await evaluateEachAnswers()
    // console.log(metricData.value)
}

const evaluateEachAnswers = async () => {
    if (overallAnswers.value && overallAnswers.value.length) {
        // Each answers are included with 5 answers each
        // Extract the first answers[0]
        const questionIds = overallAnswers.value[0]?.map(answerObj => answerObj.questionId)
        // This will have 5 answers
        // Setup each question details first
        // Isolate all the answer details by question Id
        await setupOverallQuestionDetails(questionIds)
        // Now aggregate them setting up highest, lowest and average value among each of them
        await aggregateOverallAnswers()
    }
}

const setupOverallQuestionDetails = async (questionIds) => {
    // Loop through each questionId and fetch question details for each
    for (let i = 0; i < questionIds.length; i++) {
        const questionId = questionIds[i]
        const questionDetails = await questionStore.fetchQuestionDetails(questionIds[i])
        // console.log(questionDetails)
        // Only extract needed details, title for now
        const filteredQuestionDetails = questionDetails?.title?.english
        // Now aggregate each answers based on questionId
        const allAnswersByQuestionId = overallAnswers.value?.map(answersArr => {
            const exactAnswer = answersArr?.find(answerObj => answerObj.questionId === questionId)
            return exactAnswer?.answer
        })
        overallAnswersByQuestionId.value?.push({
            question: filteredQuestionDetails,
            value: allAnswersByQuestionId
        })
    }
}

const aggregateOverallAnswers = () => {
    // Now get min, max and avg among each of them
    aggregatedAnswers.value = overallAnswersByQuestionId.value?.map(obj => {
        const answers = obj.value
        // Highest value
        const highest = Math.max(...answers) * 4;
        // Lowest value
        const lowest = Math.min(...answers) * 4;
        // Average value
        const sum = answers.reduce((acc, curr) => acc + curr, 0);
        const average = ((sum / answers.length) * 4).toFixed(2);
        // Now return them
        return {
            ...obj,
            highest,
            lowest,
            average
        }
    })
    // console.log(aggregatedAnswers.value)
}

</script>