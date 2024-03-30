export const Color = Object.freeze({
  Red: '#FF0000',
  Blue: '#0000FF',
  Green: '#008000',
  Yellow: '#FFFF00',
  Orange: '#FFA500',
  Purple: '#800080'
})

export const generateRandomColors = (n = null) => {
  const colorValues = Object.values(Color)
  // If n has value then return array of colors
  if (n) {
    const randomColors = []
    for (let i = 0; i < n; i++) {
      const randomIndex = Math.floor(Math.random() * colorValues.length)
      randomColors.push(colorValues[randomIndex])
    }
    return randomColors
  } else {
    // Else just return a random color
    const randomIndex = Math.floor(Math.random() * colorValues.length)
    return colorValues[randomIndex]
  }
}
