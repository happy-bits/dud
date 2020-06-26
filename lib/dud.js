// todo: handle ' in tests (check the JSON-clone)
// todo: solution without using "eval"
// todo: handle functions like () => {}  (not so high prio)

let fs = require('fs');
let _ = require('./underscore-min.js')

module.exports.run = function (paramSettings, ...tests) {

    info("\n....... dud starts ............................\n")

    // Verifify incomfing parameters

    if (paramSettings === null || typeof (paramSettings) !== "object") {
        error("Error in call to dud.run. First parameter must be an object")
        return
    }

    for (let prop in paramSettings) {
        let allowedParameters = ["from", "to", "path"]
        if (!allowedParameters.includes(prop)) {
            error(`Unknown parameter '${prop}'. Allowed parameters: ${allowedParameters}. Check the first parameter you dud.run call. `)
            return
        }
    }

    let paramNumber = 2
    for (let t of tests) {
        if (!Array.isArray(t)) {
            error(`Error in call to dud.run. Parameter ${paramNumber} is not an array. Maybe you forgot a comma?`)
            return
        }
        paramNumber++

    }

    // Merge'a settings with incoming settings

    mergeSettings(paramSettings, tests)

    for (let i = settings.from - 1; i < settings.to; i++) [
        test(tests[i])
    ]

    info("\n....... dud ends ............................\n")
};

let settings = {}

function valueOrDefault(value, defaultvalue) {
    return value === undefined ? defaultvalue : value;
}

function mergeSettings(paramSettings, tests) {

    settings.path = valueOrDefault(paramSettings.path, "");
    settings.from = valueOrDefault(paramSettings.from, 1);
    settings.to = valueOrDefault(paramSettings.to, tests.length);
    settings.showDetailedErrors = valueOrDefault(paramSettings.showDetailedErrors, false);

}

function samevalue(x, y) {
    return _.isEqual(x, y)
}

function getCommentArea(sourcecode) {
    let commentareas = sourcecode.match(/\/\*([\s\S]*?)\*\//)
    if (commentareas === null)
        return null

    let firstcommentarea = commentareas[1]
    return firstcommentarea
}

function parseTests(s, funToTest) {

    if (getCommentArea(s) === null)
        return []

    let onlyRowsWithArrows = getCommentArea(s).match(/^.*➞.*$/mg)

    if (onlyRowsWithArrows === null)
        return []

    let rows = []

    for (let x of onlyRowsWithArrows.map(y => y.split(/➞/))) {
        let r = {}
        try {
            r.args = JSON.parse("[" + x[0] + "]")
            r.expected = JSON.parse(x[1])
        } catch (e) {
            error(`Couldn't understand a test in '${funToTest}.js'. Check the tests in the javascript file.`)
            throw (e)
        }
        rows.push(r)
    }

    return rows

}

function error(txt, ex) {
    console.log("%c" + txt, 'color: red; font-weight: bold;')

    if (settings.showDetailedErrors && ex !== undefined)
        console.log("%c" + "   (" + ex + ")", 'color: red;')
}

function success(txt) {
    console.log("%c" + txt, 'color: green; font-weight: bold;')
}

function info(txt) {
    console.log("%c" + txt, 'color: darkyellow; font-weight: bold;')
}

function clone(x) {

    return JSON.parse(JSON.stringify(x));
}

function evaluate(sourcecode, testname) {
    eval(sourcecode)

    return eval(testname)
}

function runtest(sourcecode, funToTest, fileName) {
    let testNamesToRun = [funToTest[0]]

    for (let i = 1; i < funToTest.length; i++) {
        testNamesToRun.push(funToTest[0] + "_" + funToTest[i])
    }

    let rows = parseTests(sourcecode, funToTest[0]);

    if (rows === null || rows === undefined)
        return

    if (rows.length === 0) {
        error(`${funToTest}: No tests found`)
        return
    }


    try {
        evaluate(sourcecode)
    } catch (ex) {
        error(`Couldn't understand sourcecode for ${fileName}. Check the file for syntactic errors.`)
        return
    }

    for (let testName of testNamesToRun) {
        let failedTests = []
        let nrOfTests = 0
        let nrOfFailedTests = 0

        for (const r of clone(rows)) {

            let actual, fun

            try {
                fun = evaluate(sourcecode, testName)
                if (typeof fun !== "function")
                    throw new Error()

            } catch (ex) {
                error(`Didn't find the function ${testName} in file ${fileName}. Check the spelling.`, ex)
                return
            }

            try {
                actual = fun(...r.args)
            } catch (e) {

                error(`An exception occured while running the function ${testName}. Check the implementation and try again`)
                throw (e)
                return
            }

            nrOfTests++

            if (!samevalue(actual, r.expected)) {
                failedTests.push({ args: r.args, expected: r.expected, actual })
                nrOfFailedTests++
            }

        }

        if (nrOfFailedTests === 0)
            success(`${testName.padEnd(40)} All ${nrOfTests} tests passed`)

        else {
            if (nrOfFailedTests === nrOfTests)
                error(`${testName.padEnd(40)} All ${nrOfFailedTests} tests failed`)
            else
                error(`${testName.padEnd(40)} ${nrOfFailedTests} tests failed of ${nrOfTests}`)

            for (let failed of failedTests) {

                console.log("   "
                    + removeFirstAndLast(stringify(failed.args)).padEnd(30)
                    + stringify(failed.expected).padEnd(30)
                    + stringify(failed.actual).padEnd(30))
            }
        }

        function removeFirstAndLast(s) {
            return s.substring(1, s.length - 1)
        }

        function stringify(v, colSize) {
            if (v === undefined) return "undefined"

            return JSON.stringify(v)
        }

    }

}

function test(funToTest) {

    let fileName

    if (!Array.isArray(funToTest)) {
        error(`Found a parameter in _app.js that are no array. (Maybe you forgot a comma?)`)
        return
    }

    if (funToTest.length === 0) {
        error(`Found a empty array in _app.js Remove that test.`)
        return
    }

    try {
        fileName = funToTest[0] + ".js"
    } catch (ex) {
        error(`Error reading testfile. Check _app.js.`)
        return
    }

    let response
    let fileToRead = __dirname + "/../" + settings.path + fileName
    try {
        response = fs.readFileSync(fileToRead, 'utf8');
    } catch (ex) {
        error(`The file '${ex.path}' could not be loaded.`, ex)
        return
    }

    runtest(response, funToTest, fileName)
}



