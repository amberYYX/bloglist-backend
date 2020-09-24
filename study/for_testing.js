/*A palindrome is a word, number, phrase,
or other sequence of characters
which reads the same backward as forward,
such as madam, racecar.*/

const palindrome = (string) => {
  return string
    .split('')
    .reverse()
    .join('')
}

const average = (array) => {
  const reducer = (sum, item) => {
    return sum + item
  }

  // return array.reduce(reducer, 0) / array.length
  return array.length === 0
    ? 0
    : array.reduce(reducer, 0) / array.length
}

module.exports = {
  palindrome,
  average,
}