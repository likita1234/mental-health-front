export const formatFormSectionMetricToTableJson = (metricData) => {
  if (metricData && metricData.length > 0) {
    // First generate total value for each object
    const totalIncludedMetricData = getTotalForEachObject(metricData)
    console.log(totalIncludedMetricData)
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
    const total = Object.values(item.answers[0]).reduce((acc, curr) => acc + curr, 0)
    return {
      ...item,
      total
    }
  })
}
