import authApi from '@/utils/axios'
import AppError from '@/utils/app-error'

const FORM_API = 'assessmentForm'

class FormService {
  // Add a new form
  static async addForm(body) {
    try {
      return await authApi.post(FORM_API, body)
    } catch (error) {
      throw new AppError(error.statusCode, 'Failed to add new form')
    }
  }
  // Fetch all existing form
  static async getAllForms(queryParams) {
    try {
      const { page, limit, sort, fields } = queryParams
      return await authApi.get(FORM_API, {
        params: {
          page,
          limit,
          sort,
          fields
        }
      })
    } catch (error) {
      throw new AppError(error.statusCode, 'Failed to fetch all forms')
    }
  }

  // Fetch existing form details by id
  static async getFormDetails(id) {
    try {
      return await authApi.get(`${FORM_API}/${id}`)
    } catch (error) {
      throw new AppError(error.statusCode, 'Failed to fetch form details')
    }
  }

  // Update existing form details :- id is in body
  static async updateForm(body) {
    try {
      return await authApi.patch(`${FORM_API}/${body.id}`, body)
    } catch (error) {
      throw new AppError(error.statusCode, 'Failed to update form details')
    }
  }

  // Delete an existing form based on id
  static async deleteForm(id) {
    try {
      return await authApi.delete(`${FORM_API}/${id}`)
    } catch (error) {
      throw new AppError(error.statusCode, 'Failed to delete form')
    }
  }
}

export default FormService
