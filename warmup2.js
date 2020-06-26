/*
   5, true     ➞ "*6*"
   20, true    ➞ "*21*"
   10, false   ➞ "11"
   15, false   ➞ "16"
 */

function warmup2(a, b) {
  if (b)
    return `*${a + 1}*`

  return `${a + 1}`
}

function warmup2_oneline(a, b) {
  return b ? `*${a + 1}*` : `${a + 1}`
}