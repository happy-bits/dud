
const dud = require('./dud')

dud.run(

    { path: 'tests/' },

    ['warmup1'],
    ['warmup2', 'oneline'],
    ['warmup3', 'filter', 'oneline'],
    ['warmup4', 'regex'],
)
