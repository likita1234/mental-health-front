import { defineStore } from 'pinia'
import { ref } from 'vue'

import AppResponse from '@/utils/app-response'
import DashboardService from '@/services/dashboard-service'

export const useDashboardStore = defineStore('dashboard', () => {
  // States
  const dashboards = ref([])

  // Getters

  // Actions
  // Get Dashboard Details
  const getDashboardDetails = async (dashboardId) => {
    const response = await DashboardService.getDashboardDetails(dashboardId)
    return response.data
  }

  // Helpers

  // Returns
  return {
    // States
    dashboards,

    // Getters

    // Actions
    getDashboardDetails

    // Helpers
  }
})
