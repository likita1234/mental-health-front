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
  const allAnswers = computed(() => {
    return answers.value
  })

  // actions

  // Submit form assessment answers
  const submitAnswerForm = async (formDetails, formatted = false) => {
    // Check if formDetails is already formatted, otherwise format it as required
    // By default formatted is false
    const payloadBody = formatted ? formDetails : loadSubmissionFormAnswers(formDetails)
    const response = await FormService.submitAnswerForm(payloadBody)
    return response.statusCode === 201
  }

  // Submit large csv data at once
  const submitCsvData = async (jsonData, formDetails) => {
    // Fetch the required details
    const submissionData = {
      formId: formDetails._id,
      type: formDetails.type
    }
    // Make sure to filter the null keys and null values in the jsonData objects
    const filteredAnswersArr = jsonData?.map((obj) =>
      Object.fromEntries(
        Object.entries(obj).filter(([key, value]) => key.trim() !== '' && value !== null)
      )
    )

    // Create a counter for each
    let submittedFormCount = 0
    // Now loop through the filteredAnswersArr and submit it
    for (let i = 0; i < filteredAnswersArr.length; i++) {
      // Make questionId and answer object
      const answers = Object.entries(filteredAnswersArr[i])
        .filter(([key, value]) => key !== '' && value !== null)
        .map(([key, value]) => ({ questionId: key, answer: value }))
      // Check if there is answers otherwise skip
      if (answers.length > 0) {
        // Create the body for submission
        const submissionForm = {
          ...submissionData,
          answers
        }
        // Then submit the form answer
        const formattedData = true // We set this true because we have already formatted the data
        const formSubmitted = await submitAnswerForm(submissionForm, formattedData)
        if (formSubmitted) {
          submittedFormCount++
        }
      }
    }

    return submittedFormCount
  }

  //   Helpers
  const loadSubmissionFormAnswers = (formDetails) => {
    // First map them into new variable
    const submissionData = {
      formId: formDetails._id,
      // type: formDetails.type,
      userId: formDetails.userId
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
          answer: questionObj.answer?.toString() ?? ''
        }
      })

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
    allAnswers,
    // actions
    // fetchAllAnswers,
    submitAnswerForm,
    submitCsvData,
    // helpers
    initAnswerForm
  }
})
