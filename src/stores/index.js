import { useAuthStore } from './auth'
import { useFormErrorStore } from './formError'
import { useQuestionStore } from './question'

const authStore = useAuthStore()
const formErrorStore = useFormErrorStore()
const questionStore = useQuestionStore()

export {
  authStore,
  formErrorStore,
  questionStore
}
