import * as yup from 'yup'
import { formErrorStore } from '@/stores'
import { snakeToCamel } from '@/utils/text-formatter'
import { showToast } from '@/utils/show-toast'
import { QuestionType } from '@/constants'
import AppError from '@/utils/app-error'
// ===============> Schemas here

// ============> Login Schema
export const LoginSchema = yup.object({
  email: yup.string().email('Invalid Email').required('Email field is required'),
  password: yup.string().required('Password field cannot be empty')
})

// ============> Question Form Validation Schema
export const QuestionSchema = yup.object().shape({
  title: yup.object({
    english: yup.string().required('Question Title is required'),
    nepali: yup.string().required('Nepali Question Title is required')
  }),
  description: yup.object({
    english: yup.string().required('Description is required'),
    nepali: yup.string().required('Description in Nepali required')
  }),
  type: yup.string().required('Question type is mandatory'),
  options: yup.array().when('type', {
    is: (value) => value === QuestionType.RADIO || value === QuestionType.CHECKBOX,
    then: () =>
      yup.array().of(
        yup.object({
          optionName: yup.string().required('Option name is mandatory'),
          optionValue: yup.string().required('Option value is mandatory')
        })
      )
  })
})

// ================> Error validation handler

export const handleValidation = async (formData, schema) => {
  try {
    await schema.validate(formData, { abortEarly: false })
    formErrorStore.clearErrors()
    return true
  } catch (error) {
    if (error.inner && typeof error.inner === 'object') {
      const errors = errorHandler(error)
      formErrorStore.addErrors(errors)
      showToast('info', 'Invalid Data', 'Please input valid data')
    } else {
      throw new AppError(error.status, error?.data?.message)
    }
  }
}

// ============> Converts errors into custom camel formats
export const errorHandler = (errors) => {
  let validationError = []
  // handle the validation errors
  for (const error of errors.inner) {
    const errorString = snakeToCamel(error.path)
    // populates the error message
    validationError[errorString] = error.message
  }
  return validationError
}
