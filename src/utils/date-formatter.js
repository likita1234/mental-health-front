import { DateTime } from "luxon"

export const formatDisplayDate = (dateVal) => {
  return dateVal ? DateTime.fromISO(dateVal).setLocale('en-GB').toFormat('dd-MM-yyyy') : ''
}
