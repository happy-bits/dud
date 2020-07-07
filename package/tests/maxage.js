/*
    Get the age of the oldest person.

    [{ "name": "Kalle", "age": 22 }]                                ➞ 22
    [{ "name": "Kalle", "age": 22 }, { "name": "Lisa", "age": 43 }] ➞ 43
    [{ "name": "Kalle", "age": 50 }, { "name": "Lisa", "age": 22 }] ➞ 50

    If no object have the property "age" then zero will be returned.

    [] ➞ 0

*/

function maxage(arr) {
    let result = 0
    for (let x of arr)
        result = Math.max(x.age, result)
    return result
}