import { defineStore } from 'pinia'
import { ref } from 'vue'
import { useLocalStorage } from '@vueuse/core'

import AuthService from '@/services/AuthService'
import { showToast } from '@/utils/show-toast'

export const useAuthStore = defineStore('auth', () => {
  // states
  const loggedUser = ref(useLocalStorage('loggedUser', {}))
  const token = ref(useLocalStorage('token', null))

  // getters

  // helpers
  const setupUserData = (userData) => {
    loggedUser.value = userData.user
    token.value = userData.token
  }

  // actions
  const login = async (body) => {
    try {
      const currentUser = await AuthService.login(body)
      if (currentUser) {
        setupUserData(currentUser)
        return true
      }
      return false
    } catch (error) {
      showToast('warn', error.data?.status, error.data?.message)
    }
  }

  return {
    // states
    loggedUser,
    token,

    // getters

    // actions
    login
  }
})
