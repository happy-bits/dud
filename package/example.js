
const dud = require('./dud')

dud.run(

    { path: 'tests/' },

    ['maxage'],
    ['maybeAddStars', 'oneline'],
    ['pickEverySecondElement'],
)
