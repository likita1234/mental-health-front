import { computed, ref } from 'vue'
import { defineStore } from 'pinia'

import QuestionService from '@/services/question-service'
import { formatDisplayDate } from '@/utils/date-formatter'
import AppResponse from '@/utils/app-response'

export const useQuestionStore = defineStore('question', () => {
  // states
  const questionOption = ref({
    id: 1,
    title: {
      english: null,
      nepali: null
    },
    optionValue: null
  })

  const question = ref({
    title: {
      english: null,
      nepali: null
    },
    description: {
      english: null,
      nepali: null
    },
    type: null,
    options: [
      {
        id: null,
        title: {
          english: null,
          nepali: null
        },
        optionValue: null
      }
    ]
  })

  const questions = ref([])
  const totalQuestions = ref(null)
  // =========>Advanced filterings
  const page = ref(null)
  const limit = ref(null)
  const sort = ref(null)
  const fields = ref(null)
  // =========>Advanced filterings Ends
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
      // console.log(response.data.questions)
      questions.value = response.data.questions
      totalQuestions.value = response.data.total
    }
  }

  const addNewQuestion = async () => {
    //console.log(question.value)
    const payloadBody = { ...question.value }
    if (payloadBody.options?.length > 0) {
      payloadBody.options = payloadBody.options?.map((option) => {
        return {
          title: option.title,
          optionValue: option.optionValue
        }
      })
    }
    const response = await QuestionService.addQuestion(payloadBody)
    if (response.statusCode === 201) {
      // Push the newly added question into the questions array
      questions.value.push(response.data)
      // clean the question object
      initQuestionData()
      new AppResponse(response.statusCode, 'Question added successfully')
      return true
    }
    return false
  }

  // helpers
  const addQuestionOption = () => {
    // Check options length and place it as a new id on each
    const newId = question.value.options.length + 1
    question.value.options.push({ ...questionOption.value, id: newId })
  }

  const removeQuestionOption = (keyIndex) => {
    question.value.options.splice(keyIndex, 1)
  }

  const initQuestionData = () => {
    question.value = {
      title: {
        english: null,
        nepali: null
      },
      description: {
        english: null,
        nepali: null
      },
      type: null,
      options: [
        {
          id: null,
          title: {
            english: null,
            nepali: null
          },
          optionValue: null
        }
      ]
    }
  }

  return {
    // filter states
    page,
    limit,
    sort,
    fields,
    // states
    question,
    // getters
    allQuestions,
    // actions
    fetchAllQuestions,
    addNewQuestion,

    // helpers
    addQuestionOption,
    removeQuestionOption
  }
})
