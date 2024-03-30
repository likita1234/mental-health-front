import authApi from '@/utils/axios'
import AppError from '@/utils/app-error'

const SECTION_API = 'section'

class SectionService {
  // Add a new section
  static async addSection(body) {
    try {
      return await authApi.post(SECTION_API, body)
    } catch (error) {
      throw new AppError(error.statusCode, 'Failed to add new section')
    }
  }
  // Fetch all existing sections
  static async getAllSections(queryParams) {
    try {
      const { page, limit, sort, fields } = queryParams
      return await authApi.get(SECTION_API, {
        params: {
          page,
          limit,
          sort,
          fields
        }
      })
    } catch (error) {
      throw new AppError(error.statusCode, 'Failed to fetch all sections')
    }
  }

  // Fetch existing section details by id
  static async getSectionDetails(sectionId) {
    try {
      return await authApi.get(`${SECTION_API}/${sectionId}`)
    } catch (error) {
      throw new AppError(error.statusCode, 'Failed to fetch section details')
    }
  }

  // Update existing section details :- sectionId is in body
  static async updateSection(body) {
    try {
      return await authApi.patch(`${SECTION_API}/${body.id}`, body)
    } catch (error) {
      throw new AppError(error.statusCode, 'Failed to update section details')
    }
  }

  // Delete an existing section based on section id
  static async deleteSection(sectionId) {
    try {
      return await authApi.delete(`${SECTION_API}/${sectionId}`)
    } catch (error) {
      throw new AppError(error.statusCode, 'Failed to delete section')
    }
  }
}

export default SectionService
