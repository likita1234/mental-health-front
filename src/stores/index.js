import { useAuthStore } from './auth'
import { useFormStore } from './form'
import { useFormErrorStore } from './formError'
import { useSectionStore } from './section'
import { useQuestionStore } from './question'

const authStore = useAuthStore()
const formStore = useFormStore()
const formErrorStore = useFormErrorStore()
const sectionStore = useSectionStore()
const questionStore = useQuestionStore()

export { authStore, formStore, formErrorStore, sectionStore, questionStore }
