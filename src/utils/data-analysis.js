export const calculateWeightedMeanAndSD = (values, frequencies) => {
  //  Function to calculate weighted
  function calculateWeightedMean(values, frequencies) {
    let sum = 0
    let totalFrequency = 0
    for (let i = 0; i < values.length; i++) {
      sum += values[i] * frequencies[i]
      totalFrequency += frequencies[i]
    }
    return sum / totalFrequency
  }

  // Function to calculate variance
  function calculateVariance(values, frequencies, mean) {
    let sum = 0
    let totalFrequency = 0
    for (let i = 0; i < values.length; i++) {
      sum += frequencies[i] * Math.pow(values[i] - mean, 2)
      totalFrequency += frequencies[i]
    }
    return sum / totalFrequency
  }

  // Function to calculate standard deviation
  function calculateStandardDeviation(variance) {
    return Math.sqrt(variance)
  }
  // Calculate Mean
  const weightedMean = calculateWeightedMean(values, frequencies)

  // Calculate Variance
  const variance = calculateVariance(values, frequencies, weightedMean)

  // Calculate Standard Deviation
  const standardDeviation = calculateStandardDeviation(variance)

  // Return an object containing both mean and standard deviation
  return { weightedMean, standardDeviation }
}

export const correlationMatrix = (datasets) => {
  const matrix = []
  for (let i = 0; i < datasets.length; i++) {
    const rowData = []
    for (let j = 0; j < datasets.length; j++) {
      const correlation = pearsonCorrelation(datasets[i], datasets[j])
      rowData.push(correlation)
    }
    matrix.push(rowData)
  }
  return matrix
}

const mean = (data) => {
  return data.reduce((acc, val) => acc + val, 0) / data.length
}

const covariance = (data1, data2) => {
  const mean1 = mean(data1)
  const mean2 = mean(data2)
  let cov = 0
  for (let i = 0; i < data1.length; i++) {
    cov += (data1[i] - mean1) * (data2[i] - mean2)
  }
  return cov / (data1.length - 1)
}

const standardDeviation = (data) => {
  const meanValue = mean(data)
  const squaredDiffs = data.map((val) => Math.pow(val - meanValue, 2))
  const variance = mean(squaredDiffs)
  return Math.sqrt(variance)
}

const pearsonCorrelation = (data1, data2) => {
  const cov = covariance(data1, data2)
  const stdDev1 = standardDeviation(data1)
  const stdDev2 = standardDeviation(data2)
  return ((cov / (stdDev1 * stdDev2))?.toFixed(2))
}
