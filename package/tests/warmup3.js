/* 
    Pick every second element from the list. 

    [1, 2, 3, 4]         ➞ [2, 4]
    ["A", "B", "C", "D"] ➞ ["B", "D"]
    ["A", "B"]           ➞ ["B"]
    []                   ➞ []
    null                 ➞ null

*/

function warmup3(list) {
    if (list === null)
        return null

    let result = []

    for (let i = 1; i < list.length; i = i + 2) {
        result.push(list[i])
    }
    return result;
}

// Extra: with ".filter"
function warmup3_filter(list) {
    if (list === null) return null;

    return list.filter((el, index) => {
        if (index % 2 === 1) return el;
    });
}

// Extra: with just one line
function warmup3_oneline(list) {

    return list === null ? null :
        list.filter((el, index) =>
            index % 2 === 1 ? el : null
        );
}   