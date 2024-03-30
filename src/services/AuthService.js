import authApi from '@/utils/axios'

const AUTH_API = 'auth'

class AuthService {
  static async login(body) {
    try {
      const response = await authApi.post(`${AUTH_API}/login`, body)
      if (response && response.statusCode === 200) {
        return response.data
      }
    } catch (error) {
      console.log('Authservice error', error)
      throw error
    }
  }
}

export default AuthService
