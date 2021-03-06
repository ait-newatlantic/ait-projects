export function formatNumber(number) {
  return Intl.NumberFormat().format(number)
}

export function roundNumber2D(number) {
  return Math.round((number + Number.EPSILON) * 100) / 100
}

// https://gist.github.com/tobyjsullivan/96d37ca0216adee20fa95fe1c3eb56ac
// https://idlechampions.fandom.com/wiki/Large_number_abbreviations
export function abbreviateNumber(value) {
  let newValue = value
  const suffixes = ['', 'K', 'M', 'B', 't', 'q', 'Q', 's', 'S', 'o', 'n', 'd']
  let suffixNum = 0
  while (newValue >= 1000) {
    newValue /= 1000
    suffixNum++
  }

  let strValue = newValue.toPrecision(4)
  strValue += suffixes[suffixNum]

  return removeZeroFloatingPoint(strValue)
}

export function removeZeroFloatingPoint(value) {
  return value.replace(/\.0$/, '')
}

