import { useAuthStore } from './auth'
import { useFormErrorStore } from './formError'

const authStore = useAuthStore()
const formErrorStore = useFormErrorStore()

export {
  authStore,
  formErrorStore
}
