import authApi from '@/utils/axios'
import AppError from '@/utils/app-error'

const QUESTION_API = 'question'

class QuestionService {
  // Add a new question
  static async addQuestion(body) {
    try {
      return await authApi.post(QUESTION_API, body)
    } catch (error) {
      return new AppError(error.statusCode, 'Failed to add new question')
    }
  }
  // Fetch all existing questions
  static async getAllQuestions(queryParams) {
    try {
      const { page, limit, sort, fields, params } = queryParams
      return await authApi.get(QUESTION_API, {
        params: {
          ...params,
          page,
          limit,
          sort,
          fields
        }
      })
    } catch (error) {
      return new AppError(error.statusCode, 'Failed to fetch all questions')
    }
  }

  // Fetch existing question details by question id
  static async getQuestionDetails(questionId) {
    try {
      return await authApi.get(`${QUESTION_API}/${questionId}`)
    } catch (error) {
      return new AppError(error.statusCode, 'Failed to fetch question details')
    }
  }

  // Update existing question details :- questionId is in body
  static async updateQuestion(body) {
    try {
      return await authApi.patch(`${QUESTION_API}/${body.id}`, body)
    } catch (error) {
      return new AppError(
        error.statusCode,
        error.data?.message ?? 'Failed to update question details'
      )
    }
  }

  // Delete an existing question based on question id
  static async deleteQuestion(questionId) {
    try {
      return await authApi.delete(`${QUESTION_API}/${questionId}`)
    } catch (error) {
      return new AppError(error.statusCode, error.data?.message ?? 'Failed to delete question')
    }
  }
}

export default QuestionService
