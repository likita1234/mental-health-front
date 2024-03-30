import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import { useLocalStorage } from '@vueuse/core'

import AuthService from '@/services/AuthService'
import AppError from '@/utils/app-error'
import { UserRole } from '@/constants/user-role'

export const useAuthStore = defineStore('auth', () => {
  // states
  const loggedUser = ref(useLocalStorage('loggedUser', {}))
  const token = ref(useLocalStorage('token', null))

  // getters
  const isLoggedIn = computed(() => {
    return token.value !== null
  })

  // Return user role while logged in or by default he/she is a guest
  const userRole = computed(() => {
    return loggedUser.value?.role ?? UserRole.GUEST
  })

  // helpers
  const setupUserData = (userData) => {
    loggedUser.value = userData.user
    token.value = userData.token
  }

  const initUserData = () => {
    loggedUser.value = {}
    token.value = null
  }

  // actions
  const login = async (body) => {
    const currentUser = await AuthService.login(body)
    if (currentUser) {
      setupUserData(currentUser)
      return true
    }
    return false
  }

  // logout user
  const logout = async () => {
    try {
      initUserData()
    } catch (error) {
      throw new AppError(error.status, 'Error while logging out')
    }
  }

  return {
    // states
    loggedUser,
    token,

    // getters
    isLoggedIn,
    userRole,
    // actions
    login,
    logout
  }
})
