import { ChartType } from '@/constants'
import { calculateWeightedMeanAndSD } from './data-analysis'

export const getComparativeAnalysisDashboardTableData = (allMetricData) => {
  // Format data from each metrics
  return allMetricData?.map((metricObj) => {
    const { id, title, description } = metricObj
    // Make sure to format the data before sending it for calculations
    const { values, frequencies } = getValuesAndFrequencyFromMetricData(metricObj)
    // After getting values and frequencies, calculate the weighted mean, variance, and standard deviation
    const { weightedMean, standardDeviation } = calculateWeightedMeanAndSD(values, frequencies)

    let respondentsCount = 0
    // Sum up all the values in the frequencies array
    for (let i = 0; i < frequencies.length; i++) {
      respondentsCount += frequencies[i]
    }

    return {
      id,
      title,
      description,
      respondentsCount,
      weightedMean,
      standardDeviation
    }
  })
}

// helper functions
function getValuesAndFrequencyFromMetricData(metricObj) {
  let values = [],
    frequencies = []
  // Check the chart type of metricObj, because on the basis of the type data formats may differ
  const { chartType, metricData } = metricObj
  //  Normally, only in ratings summation type the format is different, otherwise its same in all other cases
  if (chartType === ChartType.RATINGS_SUMMATION) {
    // First:- Extract the labels array which represents the values
    values = metricData?.data?.labels ?? []
    // Then:- Extract the data counts which represents the frequencies
    frequencies = metricData?.data?.data[0]?.count ?? []
  } else {
    // ==============> ! Only for Ratings type question at the moment ! //
    // At the moment only single level data exists in our overall project so we will follow that pattern here
    // Extract values and frequencies from data label and count respectively
    const dataArr = metricData?.data
    // The order of values is same as the index so we will take index as values
    for (let i = 0; i < dataArr.length; i++) {
      values?.push(i + 1)
      frequencies?.push(dataArr[i]?.count)
    }
  }
  return {
    values,
    frequencies
  }
}
