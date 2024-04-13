import { DateTime } from 'luxon'

export const formatDisplayDate = (dateVal) => {
  return dateVal ? DateTime.fromISO(dateVal).setLocale('en-GB').toFormat('dd-MM-yyyy') : null
}

export const formatDisplayDateToRequestDate = (dateVal) => {
  return dateVal ? DateTime.fromFormat(dateVal, 'dd-MM-yyyy').toFormat('yyyy-MM-dd') : null
}

export const formatLineChartDateLabels = (dateVal) => {
  if (!dateVal) {
    return 'Invalid or null input'
  }
  const date = DateTime.fromISO(dateVal, { zone: 'utc' })
  if (!date.isValid) {
    return 'Invalid date'
  }
  return date.toFormat('LLL-dd, yyyy')
}
