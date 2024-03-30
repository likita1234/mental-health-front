import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useFormErrorStore = defineStore('formError', () => {
  const formErrors = ref({})

  const addErrors = (errors) => {
    formErrors.value = { ...errors }
  }

  const clearErrors = () => {
    formErrors.value = {}
  }

  return {
    formErrors,
    addErrors,
    clearErrors
  }
})
