import { useAuthStore } from './auth'
import { useAnswerStore } from './answer'
import { useFormStore } from './form'
import { useFormErrorStore } from './formError'
import { useSectionStore } from './section'
import { useQuestionStore } from './question'

const authStore = useAuthStore()
const answerStore = useAnswerStore()
const formStore = useFormStore()
const formErrorStore = useFormErrorStore()
const sectionStore = useSectionStore()
const questionStore = useQuestionStore()

export { authStore, answerStore, formStore, formErrorStore, sectionStore, questionStore }
