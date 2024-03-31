export const formatFormSectionMetricToTableJson = (metricData) => {
  if (metricData && metricData.length > 0) {
    // First generate total value for each object
    const totalIncludedMetricData = getTotalForEachObject(metricData)
    // Now convert into the desirable format for TableJson
    return totalIncludedMetricData?.flatMap((item) => {
      const totalForQuestion = item.total
      return Object.entries(item.answers[0])?.map(([optionTitle, value]) => ({
        questionTitle: item.questionTitle,
        optionTitle,
        value,
        percent: (value / totalForQuestion) * 100
      }))
    })
  }
  return null
}

const getTotalForEachObject = (metricData) => {
  return metricData.map((item) => {
    const answers = item.answers[0]
    const total = Object.values(answers).reduce((acc, curr) => acc + curr, 0)
    return {
      ...item,
      answers: [
        {
          ...answers,
          Total: total
        }
      ],
      total: total
    }
  })
}
