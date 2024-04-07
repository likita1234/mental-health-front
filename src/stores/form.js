import { computed, ref } from 'vue'
import { defineStore } from 'pinia'

import AppResponse from '@/utils/app-response'
import FormService from '@/services/form-service'
import { AssessmentFormType } from '@/constants'
import { formatDisplayDate } from '@/utils/date-formatter'

export const useFormStore = defineStore('form', () => {
  // states
  const form = ref({
    title: {
      english: null,
      nepali: null
    },
    description: {
      english: null,
      nepali: null
    },
    sections: [
      {
        order: 1,
        sectionId: null
      }
    ],
    type: null
  })

  const forms = ref([])
  const totalForms = ref(null)
  const formDetails = ref(null)
  // =========>Advanced filterings
  const params = ref({
    type: null
  })
  const page = ref(1)
  const limit = ref(10)
  const sort = ref('createdDate')
  const fields = ref(null)
  // =========>Advanced filterings Ends

  // getters
  const allForms = computed(() => {
    return forms.value?.map((form, index) => {
      return {
        ...form,
        id: index + 1,
        engTitle: form.title.english,
        created_at: formatDisplayDate(form.createdDate),
        sectionsCount: form.sections.length
      }
    })
  })
  // // Returns all the public assessment forms with active polls
  // const activeForms = computed(() => {
  //   return allForms.value?.filter(
  //     (form) => form.pollActive === true && form.type === AssessmentFormType.PUBLIC
  //   )
  // })

  // actions
  const fetchAllForms = async () => {
    const response = await FormService.getAllForms({
      params: params.value,
      page: page.value,
      limit: limit.value,
      sort: sort.value,
      fields: fields.value
    })
    if (response.statusCode === 200) {
      forms.value = response.data.forms
      totalForms.value = response.data.total
    }
  }

  const addForm = async () => {
    const payloadBody = { ...form.value }
    // Setup options
    const response = await FormService.addForm(payloadBody)
    if (response.statusCode === 201) {
      // clean the section object
      initFormData()
      await fetchAllForms()
      new AppResponse(response.statusCode, 'Form added successfully')
      return true
    }
    return false
  }

  const fetchFormDetails = async (id) => {
    const response = await FormService.getFormDetails(id)
    if (response.statusCode === 200) {
      return response.data
    }
    return null
  }

  // Edit form is for setting up form details for update on the UI
  const editForm = async (formDetails) => {
    const { _id, title, description, type, sections } = { ...formDetails }
    // Setup basic section details first
    form.value.id = _id
    form.value.title = title
    form.value.description = description
    form.value.type = type
    // Setup section options
    form.value.sections = sections?.map((sectionObj) => {
      return {
        order: sectionObj.order,
        sectionId: sectionObj.sectionId._id
      }
    })
  }

  const updateFormDetails = async () => {
    const payloadBody = { ...form.value }
    // Setup options
    payloadBody.sections = setupFormSections(payloadBody.sections)
    const response = await FormService.updateForm(payloadBody)
    if (response.statusCode === 200) {
      initFormData()
      await fetchAllForms()
      new AppResponse(response.statusCode, 'Form updated successfully')
      return true
    }
    return false
  }

  const deleteForm = async (formId) => {
    const response = await FormService.deleteForm(formId)
    if (response.statusCode === 204) {
      // Find the index of the section and filter it from the store state as well
      forms.value = forms.value.filter((form) => form._id !== formId)
      new AppResponse(response.statusCode, 'Form deleted successfully')
      return true
    }
    return false
  }

  // Helpers
  const addFormSection = () => {
    // Check sections length and place it as a new id on each
    const newId = form.value.sections?.length + 1
    const newFormSection = {
      order: newId,
      sectionId: null
    }
    form.value.sections.push(newFormSection)
  }

  const removeFormSection = (keyIndex) => {
    form.value.sections.splice(keyIndex, 1)
  }

  const setupFormSections = (sections) => {
    if (sections && sections.length > 0) {
      return sections?.map((section) => {
        return {
          order: section.order,
          sectionId: section.sectionId
        }
      })
    }
    return []
  }
  
  const initFormData = () => {
    form.value = {
      title: {
        english: null,
        nepali: null
      },
      description: {
        english: null,
        nepali: null
      },
      sections: [
        {
          order: null,
          sectionId: null
        }
      ],
      type: null
    }
  }

  return {
    // states
    params,
    page,
    limit,
    sort,
    fields,
    form,
    formDetails,
    totalForms,
    // getters
    allForms,
    // activeForms,
    // actions
    fetchAllForms,
    addForm,
    fetchFormDetails,
    editForm,
    updateFormDetails,
    deleteForm,
    // helpers
    addFormSection,
    removeFormSection,
    initFormData
  }
})
