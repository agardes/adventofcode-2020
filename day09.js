const fs = require('fs');
const read = fs.readFileSync("day09.txt");
let data = read.toString().split('\n').map(Number)
let invalid
let preamble = 25

function partOne(start,pre,ind){
    let actual = data[ind]
    let poss = data.slice(start,pre)
    let found = false
    for(let i=0;i<poss.length;i++){
        if(found){
            break
        }
        for(let j=0;j<poss.length;j++){
            if(poss[i]+poss[j]==actual){
                found = true
                break
            }
        }
    }
    found ?  partOne(start+1,pre+1,ind+1) : (invalid = actual)     
}
partOne(0,preamble,preamble)
console.log("Part one = " + invalid)

let l = -1
for(let m=0;m<data.length;m++){
    l++
    for(let i=3;i<data.length-3;i++){
        let j = data.slice(m,l+i)
        let el = j.reduce((a,b)=>a+b)
        if(el==invalid){
            console.log('part two = ' + parseInt(Math.min(...j)+Math.max(...j)))
            i=data.length
        }else if(el>invalid){
            i=data.length
        }
    }
}


