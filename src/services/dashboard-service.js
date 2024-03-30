import authApi from '@/utils/axios'
import AppError from '@/utils/app-error'

const DASHBOARD_API = 'dashboard'

class DashboardService {
  // Fetch all dashboards
  static async fetchDashboards(queryParams) {
    try {
      const { page, limit, sort, fields, params } = queryParams
      return await authApi.get(DASHBOARD_API, {
        params: {
          ...params,
          page,
          limit,
          sort,
          fields
        }
      })
    } catch (error) {
      return new AppError(error.statusCode, 'Failed to fetch all dashboards')
    }
  }
  // Fetch dashboard details by id
  static async getDashboardDetails(dashboardId) {
    try {
      return await authApi.get(`${DASHBOARD_API}/${dashboardId}`)
    } catch (error) {
      return new AppError(error.statusCode, 'Failed to fetch dashboard details')
    }
  }
}

export default DashboardService
