// export const Color = Object.freeze({
//   Red: '#FF0000',
//   Blue: '#0000FF',
//   Green: '#008000',
//   Yellow: '#FFFF00',
//   Orange: '#FFA500',
//   Purple: '#800080',
//   Pink: '#FFC0CB',
//   Black: '#000000',
//   White: '#FFFFFF',
//   Gray: '#808080'
// })
export const Color = Object.freeze({
  Red: '#FF6666', // Lighter version of Red
  Blue: '#6666FF', // Lighter version of Blue
  Green: '#66CC66', // Lighter version of Green
  Yellow: '#FFFF99', // Lighter version of Yellow
  Orange: '#FFC266', // Lighter version of Orange
  Purple: '#CC66CC', // Lighter version of Purple
  Pink: '#FFCCCC', // Lighter version of Pink
  Black: '#666666', // Lighter version of Black
  White: '#CCCCCC', // Lighter version of White
  Gray: '#BFBFBF' // Lighter version of Gray
})

export const generateRandomColors = (n = null) => {
  const colorValues = Object.values(Color)
  // If n has value then return array of colors
  if (n) {
    const randomColors = []
    for (let i = 0; i < n; i++) {
      const colorIndex = i % colorValues.length
      randomColors.push(colorValues[i])
    }
    return randomColors
  } else {
    // Else just return a random color
    const randomIndex = Math.floor(Math.random() * colorValues.length)
    return colorValues[randomIndex]
  }
}
