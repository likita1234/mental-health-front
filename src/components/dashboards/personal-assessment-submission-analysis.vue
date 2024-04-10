<script setup>
import PlotyHeatmap from '@/components/plugins/ploty-heatmap.vue'

import { ref, onMounted, computed, watch } from 'vue';
import { dashboardStore } from '@/stores';
import { correlationMatrix, generateHypothesisAnalysis } from '@/utils/data-analysis'

const datasets = ref([])
const hypothesisData = ref([])
const actualTitles = ref([])

onMounted(() => {
    loadDashboardData()
})

const loadDashboardData = async () => {
    const { allTitles, data, total } = await dashboardStore.getPersonalSubmissionAnalysisData()
    actualTitles.value = allTitles
    let formattedData = data?.map(rawObj => {
        let formattedObj = {
            title: rawObj.questionId,
            data: [],
            scores: [],
            submissionCounts: []
        }
        rawObj?.data?.map(dataObj => {
            formattedObj.data.push(dataObj.question?.answersTotal)
            formattedObj.scores.push(dataObj.question?.answersTotal)
            formattedObj.submissionCounts.push(dataObj.question?.totalSubmissions)
        })
        return formattedObj
    })

    if (formattedData && formattedData.length) {
        const submissionCountsArr = formattedData?.map(obj => obj.submissionCounts)[0]
        const titles = formattedData?.map(dataset => dataset.title)
        let datasetsArray = formattedData?.map(dataset => dataset.data)
        // Manually add submission datasets
        titles[total] = 'Submission Frequency'
        datasetsArray[total] = submissionCountsArr

        if (titles.length && datasetsArray.length) {
            const correlationData = correlationMatrix(datasetsArray)
            datasets.value = titles.map((title, index) => {
                const questionId = title;
                const actualTitle = getActualTitleByQuestionId(questionId)
                // debugger
                return {
                    title: actualTitle,
                    data: correlationData[index].map(value => parseFloat(value))
                }
            });
            // Once correlation have been calculated, make analysis of Hypothesis
            let correlationDatasets = datasets.value[total]?.data
            const sampleSize = datasetsArray[total]?.length
            // create table for this
            hypothesisData.value = await generateHypothesisAnalysis({ titles, correlationDatasets, sampleSize })
        }
    }
}

const getActualTitleByQuestionId = (questionId) => {
    return actualTitles.value?.find(question => question.questionId === questionId)?.title ?? 'Submission Frequency'
}

</script>

<template>

    <div v-if="datasets && datasets.length > 0" class="card p-5">
        <ploty-heatmap :datasets="datasets" />
    </div>
    <div v-else class="h-20rem flex justify-content-center align-items-center">
        <h4 class="text-center"> Data not available for analysis</h4>
    </div>
    <div v-if="hypothesisData && hypothesisData.length > 0" class="card">
        <DataTable ref="hypothesisDataDt" :value="hypothesisData">
            <template #header>
                <div class="flex flex-wrap gap-2 align-items-center justify-content-between">
                    <h4 class="m-0">P Value Analysis based on Submission Frequency</h4>
                </div>
            </template>
            <Column field="title" header="TITLE" style="width:10%">
                <template #body="slotProps">
                    <span>
                        {{ getActualTitleByQuestionId(slotProps.data.title) }}
                    </span>
                </template>
            </Column>
            <Column field="tValue" header="T VALUE" style="width:10%" />
            <Column field="pValue" header="P VALUE" style="width:10%" />
        </DataTable>
    </div>
</template>