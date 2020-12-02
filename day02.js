const fs = require('fs');
const read = fs.readFileSync("day02.txt");
const data = read.toString().split("\n").map(el=>el.split(' ')).map(el=>{
    let [a,b] = el[0].split('-')
    return [parseInt(a),parseInt(b),el[1],el[2]]
})
let partOne = 0
let partTwo =0
data.pop()
for(let i=0; i<data.length;i++){
    let [min, max, l,pass] = data[i]
    l = l[0]
    let c = 0
    if((pass[min-1] == l && pass[max-1] !== l) || (pass[min-1] !== l && pass[max-1] == l)){
        partTwo++
    }
    for(let j=0;j<pass.length;j++){
        pass[j]==l ? c++ : undefined
    }
    c >= min && c <= max ? partOne++ : undefined
}

console.log("part one = "+partOne)
console.log("part two = "+partTwo)
