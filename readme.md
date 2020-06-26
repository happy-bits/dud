# dud.js

Experimental javascript testing framework.

The idea about this "testing framework" is to have slim tests and tests that is written close to the actual function. A side effect is that tests are a good way to tell the world what your function is supposed to do (instead of writing long comments)

Here's an example of a function with four tests.

    /*
    5, true     ➞ "*6*"
    20, true    ➞ "*21*"
    10, false   ➞ "11"
    15, false   ➞ "16"
    */

    function warmup2(a, b) {
        if (b)
            return `*${a + 1}*`
        else
            return `${a + 1}`
    }

Here's a screenshot where *_app.js* is run from Visual Studio Code:

![](screenshot.png)

# Join me 

Interested in developing this idea in javascript or another language like C#?

Send a mail to oo@happybits.se

Oscar