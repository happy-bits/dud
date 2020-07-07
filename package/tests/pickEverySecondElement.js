/* 
  [1, 2, 3, 4]         ➞ [2, 4]
  ["A", "B", "C", "D"] ➞ ["B", "D"]
  ["A", "B"]           ➞ ["B"]
  []                   ➞ []
  null                 ➞ null
*/

function pickEverySecondElement(list) {
  if (list === null)
    return null

  let result = []

  for (let i = 1; i < list.length; i = i + 2) {
    result.push(list[i])
  }
  return result;
}