import authApi from '@/utils/axios'
import AppError from '@/utils/app-error'

const DASHBOARD_API = 'dashboard'

class DashboardService {
  // Fetch dashboard details by id
  static async getDashboardDetails(dashboardId) {
    try {
      return await authApi.get(`${DASHBOARD_API}/${dashboardId}`)
    } catch (error) {
      return new AppError(error.HttpStatusCode, 'Failed to fetch dashboard details')
    }
  }
}
