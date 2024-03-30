import { computed, ref } from 'vue'
import { defineStore } from 'pinia'

import AppResponse from '@/utils/app-response'
import SectionService from '@/services/section-service'
import { formatDisplayDate } from '@/utils/date-formatter'

export const useSectionStore = defineStore('section', () => {
  // states
  const section = ref({
    title: {
      english: null,
      nepali: null
    },
    description: {
      english: null,
      nepali: null
    },
    questions: [
      {
        order: 1,
        questionId: null
      }
    ]
  })

  const sections = ref([])
  const totalSections = ref(null)
  // =========>Advanced filterings
  const page = ref(1)
  const limit = ref(10)
  const sort = ref('createdDate')
  const fields = ref(null)
  // =========>Advanced filterings Ends
  // getters

  const allSections = computed(() => {
    return sections.value?.map((section, index) => {
      return {
        ...section,
        id: index + 1,
        created_at: formatDisplayDate(section.createdDate),
        questionsCount: section.questions.length
      }
    })
  })

  // actions
  const fetchAllSections = async () => {
    const response = await SectionService.getAllSections({
      page: page.value,
      limit: limit.value,
      sort: sort.value,
      fields: fields.value
    })
    if (response.statusCode === 200) {
      // console.log(response.data.sections)
      sections.value = response.data.sections
      totalSections.value = response.data.total
    }
  }

  const addNewSection = async () => {
    const payloadBody = { ...section.value }
    // Setup options
    // payloadBody.options = setupOptionsPayload(payloadBody.options)
    const response = await SectionService.addSection(payloadBody)
    if (response.statusCode === 201) {
      // clean the question object
      initSectionData()
      await fetchAllSections()
      new AppResponse(response.statusCode, 'Section added successfully')
      return true
    }
    return false
  }

  const fetchSectionDetails = async (sectionId) => {
    const response = await SectionService.getSectionDetails(sectionId)
    if (response.statusCode === 200) {
      return response.data
    }
    return null
  }
  // Edit section is for setting up section details for update on the UI
  const editSection = async (sectionDetails) => {
    const { _id, title, description, questions } = sectionDetails
    // Setup basic section details first
    section.value.id = _id
    section.value.title = title
    section.value.description = description
    // Setup section options
    section.value.questions = questions
  }

  const updateSectionDetails = async () => {
    const payloadBody = { ...section.value }
    // Setup options
    payloadBody.questions = setupSectionQuestions(payloadBody.questions)
    const response = await SectionService.updateSection(payloadBody)
    if (response.statusCode === 200) {
      initSectionData()
      await fetchAllSections()
      new AppResponse(response.statusCode, 'Section updated successfully')
      return true
    }
    return false
  }

  const deleteSection = async (sectionId) => {
    const response = await SectionService.deleteSection(sectionId)
    if (response.statusCode === 204) {
      // Find the index of the section and filter it from the store state as well
      sections.value = sections.value.filter((section) => section._id !== sectionId)
      new AppResponse(response.statusCode, 'Section deleted successfully')
      return true
    }
    return false
  }

  // helpers
  const addSectionQuestion = () => {
    // Check questions length and place it as a new id on each
    const newId = section.value.questions?.length + 1
    const newSectionQuestion = {
      order: newId,
      questionId: null
    }
    section.value.questions.push(newSectionQuestion)
  }

  const removeSectionQuestion = (keyIndex) => {
    section.value.questions.splice(keyIndex, 1)
  }

  const setupSectionQuestions = (questions) => {
    if (questions && questions.length > 0) {
      return questions?.map((question) => {
        return {
          order: question.order,
          questionId: question.questionId
        }
      })
    }
    return []
  }

  const initSectionData = () => {
    section.value = {
      title: {
        english: null,
        nepali: null
      },
      description: {
        english: null,
        nepali: null
      },
      questions: [
        {
          order: null,
          questionId: null
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
    section,
    totalSections,
    // getters
    allSections,
    // actions
    fetchAllSections,
    addNewSection,
    editSection,
    fetchSectionDetails,
    updateSectionDetails,
    deleteSection,
    // helpers
    initSectionData,
    addSectionQuestion,
    removeSectionQuestion
  }
})
