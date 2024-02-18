const getCurrentYear = () => {
  const date = new Date()
  return date.getFullYear()
}

const getLastYear = () => {
  const date = new Date()
  return `${date.getFullYear() + 1}-${date.getMonth()}-${date.getDate()}`
}

export { getCurrentYear, getLastYear }
