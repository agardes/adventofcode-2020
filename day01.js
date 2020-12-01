const fs = require('fs');
const read = fs.readFileSync("day01.txt");
const data = read.toString().split("\n").map(Number)
let s = true
let ss = true
data.forEach(el=>data.forEach(el2=> el+el2==2020 && s ? (console.log('part one = ' + el*el2),s=false) : undefined))
data.forEach(el=>data.forEach(el2=> data.forEach(el3=> el+el2+el3==2020 && ss? (console.log('part two = ' + el*el2*el3),ss=false): undefined)))