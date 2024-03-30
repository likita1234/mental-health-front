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

const colorValues = Object.values(Color)

export const generateRandomColor = (index) => {
  return colorValues[index]
}

export const generateRandomColors = (n) => {
  const randomColors = []
  for (let i = 0; i < n; i++) {
    const colorIndex = i % colorValues.length
    randomColors.push(colorValues[colorIndex])
  }
  return randomColors
}
