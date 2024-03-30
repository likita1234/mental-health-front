import { showToast } from './show-toast'

const severityMappings = {
  2: 'success'
}

const summaryMappings = {
  success: {
    200: 'Success',
    201: 'Created',
    204: 'No Content'
  }
}

class AppResponse {
  constructor(status, message) {
    this.severity = getSeverity(status)
    this.summary = getSummary(this.severity, status)
    showToast(this.severity, this.summary, message)
  }
}

function getSeverity(statusCode) {
  const firstDigit = Math.floor(statusCode / 100) // Extract the first digit of the status code
  return severityMappings[firstDigit] || 'info' // Default to 'info' if not matched
}

function getSummary(severity, statusCode) {
  return summaryMappings[severity]?.[statusCode] ?? 'Success'
}

export default AppResponse
