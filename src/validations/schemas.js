import * as yup from 'yup'
import { formErrorStore } from '@/stores'
import { snakeToCamel } from '@/utils/text-formatter'
import { showToast } from '@/utils/show-toast'

// ===============> Schemas here

// ============> Login Schema
export const LoginSchema = yup.object({
  email: yup.string().email('Invalid Email').required('Email field is required'),
  password: yup.string().required('Password field cannot be empty')
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
      throw new error(error)
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
