import { computed, ref } from 'vue'
import { defineStore } from 'pinia'

import { formatDisplayDate } from '@/utils/date-formatter'
import AppResponse from '@/utils/app-response'
import QuestionService from '@/services/question-service'
import { QuestionType } from '@/constants'

export const useQuestionStore = defineStore('question', () => {
  // states
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
  const params = ref(null)
  const page = ref(1)
  const limit = ref(10)
  const sort = ref('createdDate')
  const fields = ref(null)
  // =========>Advanced filterings Ends
  // getters
  const hasOptions = (questionType) => {
    return questionType === QuestionType.RADIO || question.value.type === QuestionType.CHECKBOX
  }

  const allQuestions = computed(() => {
    return questions.value?.map((question, index) => {
      return {
        ...question,
        id: index + 1,
        created_at: formatDisplayDate(question.createdDate),
        optionsCount: hasOptions(question.type) ? question.options.length : null
      }
    })
  })

  // actions
  const fetchAllQuestions = async (allData = false) => {
    const response = await QuestionService.getAllQuestions({
      params: params.value,
      page: page.value,
      limit: allData ? 100 : limit.value,
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
    const payloadBody = { ...question.value }
    // Setup options
    payloadBody.options = setupOptionsPayload(payloadBody.options)
    const response = await QuestionService.addQuestion(payloadBody)
    if (response.statusCode === 201) {
      // clean the question object
      initQuestionData()
      await fetchAllQuestions()
      new AppResponse(response.statusCode, 'Question added successfully')
      return true
    }
    return false
  }

  const fetchQuestionDetails = async (questionId) => {
    const response = await QuestionService.getQuestionDetails(questionId)
    if (response.statusCode === 200) {
      return response.data
    }
    return null
  }
  // Edit question is for setting up question details for update on the UI
  const editQuestion = async (questionDetails) => {
    const { _id, title, description, type, options } = questionDetails
    // Setup basic question details first
    question.value.id = _id
    question.value.title = title
    question.value.description = description
    question.value.type = type
    // Setup question options
    question.value.options = options?.map((option) => {
      return {
        id: option._id,
        title: option.title,
        optionValue: option.optionValue
      }
    })
  }

  const updateQuestionDetails = async () => {
    const payloadBody = { ...question.value }
    // Setup options
    payloadBody.options = setupOptionsPayload(payloadBody.options)
    const response = await QuestionService.updateQuestion(payloadBody)
    if (response.statusCode === 200) {
      initQuestionData()
      await fetchAllQuestions()
      new AppResponse(response.statusCode, 'Question updated successfully')
      return true
    }
    return false
  }

  const deleteQuestion = async (questionId) => {
    const response = await QuestionService.deleteQuestion(questionId)
    if (response.statusCode === 204) {
      // Find the index of the question and filter it from the store state as well and decrease the count as well
      questions.value = questions.value.filter((question) => question._id !== questionId)
      totalQuestions.value--
      new AppResponse(response.statusCode, 'Question deleted successfully')
      return true
    }
    return false
  }

  // helpers
  const addQuestionOption = () => {
    // Check options length and place it as a new id on each
    const newId = question.value.options?.length + 1
    const newQuestionOption = {
      id: newId,
      title: {
        english: null,
        nepali: null
      },
      optionValue: null
    }
    question.value.options.push(newQuestionOption)
  }

  const removeQuestionOption = (keyIndex) => {
    question.value.options.splice(keyIndex, 1)
  }

  const setupOptionsPayload = (options) => {
    if (options && options.length > 0) {
      return options?.map((option) => {
        return {
          _id: `${option.id}`,
          title: option.title,
          optionValue: option.optionValue
        }
      })
    }
    return []
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
    params,
    page,
    limit,
    sort,
    fields,
    // states
    question,
    totalQuestions,
    // getters
    allQuestions,
    // actions
    fetchAllQuestions,
    addNewQuestion,
    editQuestion,
    fetchQuestionDetails,
    updateQuestionDetails,
    deleteQuestion,
    // helpers
    initQuestionData,
    addQuestionOption,
    removeQuestionOption
  }
})
