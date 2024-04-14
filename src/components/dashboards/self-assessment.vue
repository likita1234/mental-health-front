<script setup>
import { ref, onMounted } from 'vue'
import { dashboardStore } from '@/stores'
import {formatLineChartDateLabels} from '@/utils/date-formatter'
// const actualTitles = ref([])
const overallData = ref([])
const overallSubmissions = ref(null)

onMounted(() => {
  loadDashboardData()
})

const loadDashboardData = async () => {
  const userId = '20240408_195203_238'
  const { allTitles, data, total } = await dashboardStore.getPersonalSubmissionAnalysisData(userId)
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
}
</script>

<template>
  <div v-if="overallData && overallData.length > 0" class="grid-container">
    <div v-for="data in overallData" :key="data" class="grid-item p-card my-2">
        <div>
            <h5 class="text-center">{{ data.title }}</h5>
            <Divider />
        </div>
        <div class="card-body">
            <base-chart :type="'line'" :jsonData="data.answersJson" />
        </div>
    </div>
  </div>
</template>


<style scoped>
.grid-container {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(600px, 1fr)); 
  gap: 20px; 
}

.grid-item {
  padding: 20px; 
  text-align: center;
}

@media screen and (max-width: 768px) {
  .grid-container {
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  }
}

</style>