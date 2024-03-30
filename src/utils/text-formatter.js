export const snakeToCamel = (str) => {
  return str.replace(/_([a-z])/g, (_, match) => match.toUpperCase())
}
