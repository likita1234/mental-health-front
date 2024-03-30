// export const Color = Object.freeze({
// Red: '#FF6666', // Lighter version of Red
// Blue: '#6666FF', // Lighter version of Blue
// Green: '#66CC66', // Lighter version of Green
// Yellow: '#FFFF99', // Lighter version of Yellow
// Orange: '#FFC266', // Lighter version of Orange
// Purple: '#CC66CC', // Lighter version of Purple
// Pink: '#FFCCCC', // Lighter version of Pink
// Black: '#666666', // Lighter version of Black
// White: '#CCCCCC', // Lighter version of White
// Gray: '#BFBFBF' // Lighter version of Gray
// })

export const Color = Object.freeze({
  RoyalBlue: '#4169E1',
  EmeraldGreen: '#32CD32',
  RubyRed: '#FF4500',
  GoldenYellow: '#FFD700',
  AmethystPurple: '#9966CC',
  Teal: '#008080',
  Coral: '#FF7F50',
  SlateGray: ' #708090',
  Magenta: '#FF00FF',
  Turquoise: '#40E0D0',
  Peach: '#FFDAB9',
  Lavender: '#E6E6FA',
  OliveGreen: '#808000',
  Crimson: '#DC143C',
  IndigoBlue: '#4B0082'
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
