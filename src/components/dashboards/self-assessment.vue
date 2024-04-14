<script setup>
import { ref, onMounted } from 'vue'
import { dashboardStore } from '@/stores'
import { authStore } from '@/stores';
import {formatLineChartDateLabels} from '@/utils/date-formatter'
import { storeToRefs } from 'pinia';

const {loggedUser} = storeToRefs(authStore)

const userId = ref(null)
const overallData = ref([])
const overallKeywordsData = ref([])
const overallSubmissions = ref(null)

onMounted(() => {
  loadUserData()
  loadDashboardData()
})

const loadUserData = ()=>{
    userId.value = loggedUser.value?._id
}

const loadDashboardData = async () => {
  const { allTitles, data, keywordsData } = await dashboardStore.getPersonalSubmissionAnalysisData(userId.value)
  // Map data into overallData also attach the question titles
  for (let i = 0; i < data?.length; i++) {
    const element = data[i]
    const title = allTitles?.find((titleObj) => titleObj.questionId === element.questionId)?.title
    const innerData = element?.data[0]?.question
    // Overall submissions will be same for all questions per user
    overallSubmissions.value = innerData?.totalSubmissions
    const answerData = innerData.answers
    let answerByQuestion = {
      title: title,
      answersJson: []
    }
    for (let j = 0; j < answerData?.length; j++) {
      const answerEntity = answerData[j]
      const answerObj = {
        label: formatLineChartDateLabels(answerEntity.createdDate),
        count: answerEntity.answer
      }
      answerByQuestion.answersJson.push(answerObj)
    }
    overallData.value.push(answerByQuestion)
  }
    //   Do the same for keywords data
    for(let i = 0; i < keywordsData.length; i++){
        const element = keywordsData[i]
        const title = allTitles?.find((titleObj) => titleObj.questionId === element.questionId)?.title
        const innerData = Object.entries(element?.data).map(([label, value]) => ({ label, value }));
        const dataObj = {
            title,
            data:innerData
        }
        overallKeywordsData.value.push(dataObj)
    }
}
</script>

<template>
    <div class="flex flex-column md:flex-row gap-2 text-center">
        <div class="col-12 md:col-6">
            <h5>Self Assessment Submission Wise Analysis</h5>
            <Divider />
            <div v-if="overallData && overallData.length > 0" class="flex flex-column gap-3">
                <div v-for="data in overallData" :key="data" class="p-card my-2">
                    <div>
                        <h5 class="text-center my-2">{{ data.title }}</h5>
                        <Divider />
                    </div>
                    <div class="card-body">
                        <base-chart :type="'line'" :jsonData="data.answersJson" />
                    </div>
                </div>
            </div>
            <div v-else>
                <span>Data not available</span>
            </div>
        </div>
        <Divider layout="vertical" ></Divider>
        <div class="col-12  md:col-6">
            <h5>Self Assessment Keywords Analysis</h5>
            <Divider />
            <div v-if="overallKeywordsData && overallKeywordsData.length > 0" class="flex flex-column gap-3">
                <div v-for="data in overallKeywordsData" :key="data" class="p-card my-2">
                    <div>
                        <h5 class="text-center  my-2">{{ data.title }}</h5>
                        <Divider />
                    </div>
                    <div class="card-body">
                        <base-chart type="radar" :jsonData="data.data" />  
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>