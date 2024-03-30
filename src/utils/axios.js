import axios from 'axios'
// import router from '@/router'
import { authStore } from '@/stores'
import { showToast } from './show-toast'

const authApi = axios.create({
  baseURL: import.meta.env.VITE_APP_API_URL
})

authApi.defaults.headers.common['Content-Type'] = 'application/json'

// ===============> Request interceptors
authApi.interceptors.request.use((config) => {
  config.headers.Authorization = `Bearer ${authStore.token}`
  return config
})
// ===============> Response interceptors
authApi.interceptors.response.use(
  (response) => {
    const status = response.status
    return {
      statusCode: response.status,
      data: response.data.data
    }
  },
  (error) => {
    // console.log('Error response::=>', error)
    // ==========> 1) Check for connection timeout issue
    if (error.code === 'ECONNABORTED') {
      showToast(
        'warn',
        'Connection Timeout',
        'Request timeout. Please check your network connection.'
      )
    }
    // ===========> 2) Check if there is a network connection issue
    else if (error.code === 'ERR_NETWORK') {
      // console.log(error.response)
      showToast('warn', 'Server Error', 'Issue with network connection')
    }

    //  ==========> 3) Finally, format the error if its a valid error
    else {
      const errorResponse = {
        statusCode: error.response.status,
        data: error.response.data
      }
      // console.log('Error Response formatted::', errorResponse)
      return Promise.reject(errorResponse)
    }
  }
)

export default authApi
