import { useAuthStore } from './auth'
import { useFormErrorStore } from './formError'
import { useSectionStore } from './section'
import { useQuestionStore } from './question'

const authStore = useAuthStore()
const formErrorStore = useFormErrorStore()
const sectionStore = useSectionStore()
const questionStore = useQuestionStore()

export { authStore, formErrorStore, sectionStore, questionStore }
