
/*
5, true     ➞ "*6*"
20, true    ➞ "*21*"
10, false   ➞ "11"
15, false   ➞ "16"
*/

function maybeAddStars(a, b) {
  if (b)
    return `*${a + 1}*`

  return `${a + 1}`
}

function maybeAddStars_oneline(a, b) {
  return b === true ? `*${(a + 1)}*` : (a + 1).toString()
}