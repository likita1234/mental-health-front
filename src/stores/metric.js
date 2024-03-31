import { defineStore } from 'pinia'
import { ref } from 'vue'

import AppResponse from '@/utils/app-response'
import MetricService from '@/services/metric-service'

export const useMetricStore = defineStore('metric', () => {
  // States
  const metric = ref(null)

  // Getters

  // Actions
  // Get Metric Data
  const getMetricData = async (metricId) => {
    const response = await MetricService.getMetricData(metricId)

    if (response.statusCode === 200) {
      return response.data
    }
    return null
  }

  // Get Table data analysis by form id and section id
  const getTableAnalysisByFormIdSectionId = async (formId, sectionId) => {
    const response = await MetricService.getTableAnalysisByFormIdSectionId(formId, sectionId)
    if (response.statusCode === 200) {
      return response.data
    }
    return null
  }

  // getTableAnalysisByFormIdSectionId
  // Helpers

  // Returns
  return {
    // States
    metric,

    // Getters

    // Actions
    getMetricData,
    getTableAnalysisByFormIdSectionId

    // Helpers
  }
})
