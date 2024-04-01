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
  // Fetch table analysis data by form id and section id
  static async getTableAnalysisByFormIdSectionId(formId, sectionId) {
    try {
      return await authApi.get(`${METRIC_API}/${formId}/${sectionId}/data`)
    } catch (error) {
      return new AppError(error.statusCode, 'Failed to fetch table analysis data')
    }
  }
  // Fetch keyword analysis data by form id and question id
  static async getKeywordAnalysisByFormIdQuestionId(formId, questionId) {
    try {
      return await authApi.get(`${METRIC_API}/keywords-analysis/${formId}/${questionId}`)
    } catch (error) {
      return new AppError(error.statusCode, 'Failed to fetch keyword analysis')
    }
  }
}

export default MetricService
