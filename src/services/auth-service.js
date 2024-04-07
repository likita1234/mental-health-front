import authApi from '@/utils/axios'
import AppError from '@/utils/app-error'

const AUTH_API = 'auth'

class AuthService {
  static async signup(body) {
    try {
      const response = await authApi.post(`${AUTH_API}/signup`, body)
      return response.data
    } catch (error) {
      new AppError(error.statusCode, error?.data?.message ?? 'Failed to signup new user')
    }
  }
  static async login(body) {
    try {
      const response = await authApi.post(`${AUTH_API}/login`, body)
      if (response && response.statusCode === 200) {
        return response.data
      }
    } catch (error) {
      new AppError(error.statusCode, 'Invalid credentials')
    }
  }
}

export default AuthService
