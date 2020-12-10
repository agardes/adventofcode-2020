const fs = require('fs');
const read = fs.readFileSync("day10.txt");
let data = read.toString().split('\n').map(Number)
let sorted = data.sort((a, b)=> a - b)
let builtInt = parseInt(Math.max(...data)+3)
let l =0
let diffs = {}

for(let i=0;i<sorted.length;i++){
    let diff = sorted[i] - l
    diffs[diff] ?  diffs[diff] +=1 : diffs[diff] =1
    l = sorted[i]
    i==sorted.length-1 ? (diff = builtInt - l, diffs[diff] +=1) : undefined
}
console.log("Part one = " + diffs['1']*diffs['3'])

sorted.unshift(0)
sorted.push(builtInt)
sorted=sorted.reverse()
let poss = {}
let len = {}
len[builtInt] = 1

sorted.forEach((elem)=>{
    poss[elem] = sorted.filter(el=>el>elem && el <=elem+3)
    if(elem!==builtInt){
        len[elem] = 0
        for(let i=0;i<poss[elem].length;i++){
            len[elem] += len[poss[elem][i]]  
       }       
    }
})
console.log("Part two = " +len['0'])

