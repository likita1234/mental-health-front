import { computed, ref } from 'vue'
import { defineStore } from 'pinia'

import AppResponse from '@/utils/app-response'
import FormService from '@/services/form-service'
// import { formatDisplayDate } from '@/utils/date-formatter'

export const useAnswerStore = defineStore('answer', () => {
  // states
  const answer = ref({
    formId: null,
    userId: null,
    type: null,
    answers: []
  })

  const answers = ref([])
  const totalAnswers = ref(null)
  // =========>Advanced filterings
  const page = ref(1)
  const limit = ref(10)
  const sort = ref('createdDate')
  const fields = ref(null)
  // =========>Advanced filterings Ends

  // getters
  const allAnwers = computed(() => {
    return answers.value
  })

  // actions

  // Submit form assessment answers
  const submitAnswerForm = async (formDetails) => {
    const payloadBody = loadSubmissionFormAnswers(formDetails)
    // Setup options
    const response = await FormService.submitAnswerForm(payloadBody)
    debugger
    if (response.statusCode === 201) {
      // clean the section object
      initAnswerForm()
      new AppResponse(response.statusCode, 'Survey Form submitted successfully')
      return true
    }
    return false
  }

  //   Helpers
  const loadSubmissionFormAnswers = (formDetails) => {
    // First map them into new variable
    const submissionData = {
      formId: formDetails._id,
      type: formDetails.type
    }
    // Now fetch all sections first
    const allSections = formDetails.sections
    // Create an empty array to store all questions data from each sections
    let allAnswers = []

    // loop through all sections and fetch questions from all of them
    for (let i = 0; i < allSections.length; i++) {
      const currentSection = allSections[i]
      // Fetch all questions from the current section
      // While fetching the data, only fetch the questionId and answer
      const allQuestions = currentSection.questions?.map((questionObj) => {
        return {
          questionId: questionObj._id,
          answer: questionObj.answer?.toString()
        }
      })
      // debugger
      // Now concat allQuestions to allAnswers, if you push them it will create array of array
      allAnswers = allAnswers.concat(allQuestions)
    }
    // After all questions have been concatenated, store it into submissionData as answers array
    submissionData.answers = allAnswers

    return submissionData
  }

  const initAnswerForm = () => {
    answer.value = {
      formId: null,
      userId: null,
      type: null,
      answers: []
    }
  }

  return {
    // states
    page,
    limit,
    sort,
    fields,
    answer,
    // getters
    allAnwers,
    // actions
    // fetchAllAnswers,
    submitAnswerForm,
    // helpers
    initAnswerForm
  }
})
