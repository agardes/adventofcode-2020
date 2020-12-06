const fs = require('fs');
const read = fs.readFileSync("day06.txt");
let data = read.toString().split("\n\n").map(el=>el.split('\n'))
let day06 = data.map((el)=>{
    let l = []
    let pTwo = {}
    let c = 0
    el.forEach((el2)=>{
        for(let k=0;k<el2.length;k++){
            pTwo[el2[k]] ? pTwo[el2[k]]++ : pTwo[el2[k]] = 1
            l.indexOf(el2[k])==-1 ? l.push(el2[k]) : undefined
        }
    })
    for (const [key, value] of Object.entries(pTwo)) { 
        value==el.length ? c++ : undefined
    }
    return [l.length,c]
}).reduce((a,b)=>[a[0]+b[0],a[1]+b[1]])

console.log(`Part one = ${day06[0]} - Part two = ${day06[1]}`)

