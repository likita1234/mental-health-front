export const stockClass = (count) => {
  return [
    'border-circle w-2rem h-2rem inline-flex font-bold justify-content-center align-items-center text-sm',
    {
      'bg-red-100 text-red-900': count > 0 && count <= 3,
      'bg-blue-100 text-blue-900': count > 3 && count <= 6,
      'bg-teal-100 text-teal-900': count <= 10
    }
  ]
}
