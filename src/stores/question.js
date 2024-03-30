import { computed, ref } from 'vue'
import { defineStore } from 'pinia'

import QuestionService from '@/services/question-service'
import { formatDisplayDate } from '@/utils/date-formatter'

export const useQuestionStore = defineStore('question', () => {
  // states
  const questionOption = ref({
    optionName: null,
    optionValue: null
  })

  const question = ref({
    title: null,
    description: null,
    label: null,
    type: null,
    options: []
  })
  const questions = ref([])
  const totalQuestions = ref(null)
  // =========>Advanced filterings
  const page = ref(null)
  const limit = ref(null)
  const sort = ref(null)
  const fields = ref(null)
  // =========>Advanced filterings
  // getters
  const allQuestions = computed(() => {
    return questions.value?.map((question) => {
      return {
        ...question,
        created_at: formatDisplayDate(question.createdDate),
        optionsCount: question.options?.length ?? 0
      }
    })
  })

  // actions
  const fetchAllQuestions = async () => {
    const response = await QuestionService.getAllQuestions({
      page: page.value,
      limit: limit.value,
      sort: sort.value,
      fields: fields.value
    })
    if (response.statusCode === 200) {
      console.log(response.data.questions)
      questions.value = response.data.questions
      totalQuestions.value = response.data.total
    }
  }

  return {
    // filter states
    page,
    limit,
    sort,
    fields,
    // states
    // getters
    allQuestions,
    // actions
    fetchAllQuestions
  }
})
