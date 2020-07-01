/*

    Happy smileys give one point. Sad smileys give negative one point.
    Calculate the sum of the happy/sad faces.

    ":)"         ➞ 1
    ":):)"       ➞ 2
    ":):):)"     ➞ 3
    ":("         ➞ -1
    ":(:("       ➞ -2
    ":( :("      ➞ -2
    ":) :) :)"   ➞ 3
    ":) :( :("   ➞ -1
  
    Spaces is ok between smileys

    ":) "        ➞ 1
    "  :)  :)  " ➞ 2
    ":)   :(   " ➞ 0

    Invalid input:

    ": )"        ➞ null
    ": ("        ➞ null
    ":))"        ➞ null
    ":(("        ➞ null
    ":"          ➞ null
    ")"          ➞ null
    "("          ➞ null
    ":)a"        ➞ null
    "a:)"        ➞ null
    ")"          ➞ null

 */

function warmup4(str) {

    let eyes = false
    let happiness = 0

    for (let i = 0; i < str.length; i++) {

        let current = str[i]

        switch (current) {
            case " ": eyes = false; break;
            case ":": eyes = true; break;
            case ")":
                if (!eyes)
                    return null
                happiness++
                eyes = false
                break;
            case "(":
                if (!eyes)
                    return null
                happiness--
                eyes = false
                break;
            default:
                return null
        }
    }
    if (eyes)
        return null

    return happiness

}

// Extra: create one solution using "regex"

function warmup4_regex(s) {

    if (s.replace(/:\)/g, '').replace(/:\(/g, '').trim() !== "")
        return null

    let pointsHappy = (s.match(/:\)/g) || []).length
    let pointsSad = (s.match(/:\(/g) || []).length

    return pointsHappy - pointsSad
}
