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
