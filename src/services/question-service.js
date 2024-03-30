import authApi from '@/utils/axios'
import AppError from '@/utils/app-error'

const QUESTION_API = 'question'

class QuestionService {
  // Add a new question
  static async addQuestion(body) {
    try {
      return await authApi.post(QUESTION_API, body)
    } catch (error) {
      throw new AppError(error.statusCode, 'Failed to add new question')
    }
  }
  // Fetch all existing questions
  static async getAllQuestions(queryParams) {
    try {
      const { page, limit, sort, fields } = queryParams
      return await authApi.get(QUESTION_API, {
        params: {
          page,
          limit,
          sort,
          fields
        }
      })
    } catch (error) {
      throw new AppError(error.statusCode, 'Failed to fetch all questions')
    }
  }
}

export default QuestionService
