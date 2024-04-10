import { defineStore } from 'pinia'
import { ref } from 'vue'

import AppResponse from '@/utils/app-response'
import DashboardService from '@/services/dashboard-service'

export const useDashboardStore = defineStore('dashboard', () => {
  // States
  const dashboards = ref([])
  const totalDashboards = ref(null)
  // =========>Advanced filterings
  const params = ref(null)
  const page = ref(1)
  const limit = ref(10)
  const sort = ref('createdDate')
  const fields = ref(null)
  // =========>Advanced filterings Ends

  // Getters

  // Actions
  const fetchDashboards = async () => {
    // Check if there are any params
    // At the moment it supports only type

    const response = await DashboardService.fetchDashboards({
      params: params.value,
      page: page.value,
      limit: limit.value,
      sort: sort.value,
      fields: fields.value
    })
    if (response.statusCode === 200) {
      dashboards.value = response.data.dashboards
      totalDashboards.value = response.data.total
    }
  }

  // Get Dashboard Details
  const getDashboardDetails = async (dashboardId) => {
    const response = await DashboardService.getDashboardDetails(dashboardId)
    return response.data
  }

  // Get Dashboard data
  const getDashboardData = async (dashboardId) => {
    const response = await DashboardService.getDashboardData(dashboardId)
    return response.data
  }

  const getPersonalSubmissionAnalysisData = async () => {
    const response = await DashboardService.getPersonalSubmissionAnalysisData()
    return response.data
  }

  // Helpers

  // Returns
  return {
    // Filterings
    params,
    page,
    limit,
    sort,
    fields,
    // States
    dashboards,
    totalDashboards,

    // Getters

    // Actions
    fetchDashboards,
    getDashboardDetails,
    getDashboardData,
    getPersonalSubmissionAnalysisData

    // Helpers
  }
})
