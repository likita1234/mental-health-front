import { LanguageType, QuestionType } from '@/constants'

export const getLanguages = () => [
  { name: 'English', value: LanguageType.ENGLISH },
  { name: 'Nepali', value: LanguageType.NEPALI }
]

export const getQuestionType = () => [
  { id: 1, name: 'Text', value: QuestionType.TEXT },
  { id: 2, name: 'Number', value: QuestionType.NUMBER },
  { id: 3, name: 'Dropdown', value: QuestionType.DROPDOWN },
  { id: 4, name: 'Radiobutton', value: QuestionType.RADIO },
  { id: 5, name: 'Checkbox', value: QuestionType.CHECKBOX },
  { id: 6, name: 'Ratings', value: QuestionType.RATINGS }
]
