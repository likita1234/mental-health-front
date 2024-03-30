import { defineStore } from 'pinia'
import { ref } from 'vue'

import AppResponse from '@/utils/app-response'
import DashboardService from '@/services/dashboard-service'

export const useDashboardStore = defineStore('dashboard', () => {
  // States
  const dashboards = ref([])
  // =========>Advanced filterings
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

    const response = await DashboardService.getAllQuestions({
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

  // Helpers

  // Returns
  return {
    // Filterings
    page,
    limit,
    sort,
    fields,
    // States
    dashboards,

    // Getters

    // Actions
    fetchDashboards,
    getDashboardDetails

    // Helpers
  }
})
