<script setup>
import RelationshipSkeleton from '@/components/common/skeleton/relationship-dashboard.vue'
import PlotyHeatmap from '@/components/plugins/ploty-heatmap.vue'

import { ref, onMounted } from 'vue';
import { dashboardStore } from '@/stores';
import { correlationMatrix, generateHypothesisAnalysis } from '@/utils/data-analysis'
import AppError from '@/utils/app-error';

const datasets = ref([])
const hypothesisData = ref([])
const actualTitles = ref([])
const blockContents = ref([])
const isLoading = ref(false)

onMounted(() => {
    loadDashboardData()
})

const loadDashboardData = async () => {
    try {
        isLoading.value = true;
        const { allTitles, data, total } = await dashboardStore.getPersonalSubmissionAnalysisData()
        loadBlockContents(data)
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
    } catch (error) {
        new AppError(400, error?.message ?? 'Failed to Load Personal Assessment Dashboard')
    } finally {
        isLoading.value = false
    }
}

const getActualTitleByQuestionId = (questionId) => {
    return actualTitles.value?.find(question => question.questionId === questionId)?.title ?? 'Submission Frequency'
}

const loadBlockContents = (allData) => {
    blockContents.value[0] = {
        label: 'Total Respondents',
        total: allData[0]?.data?.length - 1,
        icon: 'pi-user',
        color: 'text-blue-500',
        bgColor: 'bg-blue-100'
    }
    blockContents.value[1] = {
        label: 'Independent Variables',
        total: allData?.length,
        icon: 'pi-sitemap',
        color: 'text-orange-500',
        bgColor: 'bg-orange-100'
    }
    blockContents.value[2] = {
        label: 'Dependent Variables',
        icon: 'pi-angle-right',
        total: 1,
        color: 'text-cyan-500',
        bgColor: 'bg-cyan-100'
    }
}

</script>

<template>
    <relationship-skeleton v-if="isLoading" />
    <div v-else>
        <div>
            <div class="grid">
                <div v-for="block in blockContents" :key="block" class="col-12 md:col-4">
                    <div class="p-card p-3 border-round">
                        <div class="flex justify-content-between mb-3">
                            <div>
                                <span class="block text-500 font-medium mb-3">{{ block.label }}</span>
                                <div class="text-900 font-medium text-xl">{{ block.total }}</div>
                            </div>
                            <div class="flex align-items-center justify-content-center border-round"
                                :class="block.bgColor" style="width:2.5rem;height:2.5rem">
                                <i class="pi text-xl" :class="[block.icon, block.color]"></i>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
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
    </div>
</template>