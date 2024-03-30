import { showToast } from './show-toast'

const severityMappings = {
  4: 'warn',
  5: 'danger'
}

const summaryMappings = {
  warn: {
    400: 'Bad Request',
    401: 'Unauthorized',
    403: 'Forbidden',
    404: 'Not Found'
  },
  danger: {
    500: 'Internal Server Error'
  }
}

class AppError extends Error {
  constructor(status, message) {
    super(message)
    this.severity = getSeverity(status)
    this.summary = getErrorSummary(this.severity, status)
    showToast(this.severity, this.summary, message)
  }
}

function getSeverity(statusCode) {
  const firstDigit = Math.floor(statusCode / 100) // Extract the first digit of the status code
  return severityMappings[firstDigit] || 'info' // Default to 'info' if not matched
}

function getErrorSummary(severity, statusCode) {
  return summaryMappings[severity]?.[statusCode] ?? 'Unknown Error'
}

export default AppError
