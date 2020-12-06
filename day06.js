const fs = require('fs');
const read = fs.readFileSync("day06.txt");
let data = read.toString().split("\n\n").map(el=>el.split('\n'))
let c = 0
let c2 = 0
data.forEach((el) => {
    let l = []
    let pTwo = {}
    let p = el.length
    el.forEach((el2)=>{
        for(let k=0;k<el2.length;k++){
            pTwo[el2[k]] ? pTwo[el2[k]]++ : pTwo[el2[k]] = 1
            l.indexOf(el2[k])==-1 ? l.push(el2[k]) : undefined
        }
    })
    c+=l.length
    for (const [key, value] of Object.entries(pTwo)) { 
        value==p ? c2++ : undefined
    } 
})
console.log('Part one = ' +c)
console.log('Part two = ' +c2)
