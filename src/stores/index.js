import { useAuthStore } from './auth'
import { useAnswerStore } from './answer'
import { useDashboardStore } from './dashboard'
import { useFormStore } from './form'
import { useFormErrorStore } from './formError'
import { useSectionStore } from './section'
import { useQuestionStore } from './question'

const authStore = useAuthStore()
const answerStore = useAnswerStore()
const dashboardStore = useDashboardStore()
const formStore = useFormStore()
const formErrorStore = useFormErrorStore()
const sectionStore = useSectionStore()
const questionStore = useQuestionStore()

export {
  authStore,
  answerStore,
  dashboardStore,
  formStore,
  formErrorStore,
  sectionStore,
  questionStore
}
