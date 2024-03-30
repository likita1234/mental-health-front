import { DateTime } from 'luxon'

export const formatDisplayDate = (dateVal) => {
  return dateVal ? DateTime.fromISO(dateVal).setLocale('en-GB').toFormat('dd-MM-yyyy') : null
}

export const formatDisplayDateToRequestDate = (dateVal) => {
  return dateVal ? DateTime.fromFormat(dateVal, 'dd-MM-yyyy').toFormat('yyyy-MM-dd') : null
}
