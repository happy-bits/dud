# dud.js

Experimental JavaScript testing library.

With this testing library you can comment your functions with simple test cases. When *dud.js* is executed it will **run your tests from the comments**.

A side effect is that the test cases usually gives you a pretty good documentation of the function.

## Example 1

Here's an example of a function with five tests.

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


A ten minute clip showing how to use dud.js:

https://youtu.be/2sV_dMO46as

## Example 2

Of course you can have multiple parameters. And you can easily create multiple versions of the same function and run the same test cases on all functions.

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

## Example 3

If you just write normal comments these lines will be ignored. Only lines that contains '➞' will be interpreted as tests. So here we have four tests:

    /*
        Get the age of the oldest person.

        [{ "name": "Kalle", "age": 22 }]                                ➞ 22
        [{ "name": "Kalle", "age": 22 }, { "name": "Lisa", "age": 43 }] ➞ 43
        [{ "name": "Kalle", "age": 50 }, { "name": "Lisa", "age": 22 }] ➞ 50

        If no object have the property "age" then zero will be returned.

        [] ➞ 0

    */

    function maxage(arr) {
        let result=0
        for(let x of arr)
            result = Math.max(x.age, result)
        return result
    }


## Usage

Install the package:

    npm install @happybits/dud


Create a file **example.js** with this code:

    const dud = require('@happybits/dud')

    dud.run(

        { path: 'tests/' },

        ['maxage'],
        ['maybeAddStars', 'oneline'],
        ['pickEverySecondElement'],
    )

In the folder **tests** add the files maxage.js, maybeAddStars.js, pickEverySecondElement.js

Run **example.js**

## Join me 

Interested in developing this idea in JavaScript or another language like C#?

Send a mail to oo@happybits.se

Oscar