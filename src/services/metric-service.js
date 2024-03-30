import authApi from '@/utils/axios'
import AppError from '@/utils/app-error'

const METRIC_API = 'metric'

class MetricService {
  // Fetch metric data by id
  static async getMetricData(metricId) {
    try {
      return await authApi.get(`${METRIC_API}/${metricId}/data`)
    } catch (error) {
      return new AppError(error.statusCode, 'Failed to fetch metric data')
    }
  }
}

export default MetricService
