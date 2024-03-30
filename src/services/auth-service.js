import authApi from '@/utils/axios'
import AppError from '@/utils/app-error'

const AUTH_API = 'auth'

class AuthService {
  static async login(body) {
    try {
      const response = await authApi.post(`${AUTH_API}/login`, body)
      if (response && response.statusCode === 200) {
        return response.data
      }
    } catch (error) {
      return new AppError(error.statusCode, 'Invalid credentials')
    }
  }
}

export default AuthService
