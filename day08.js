const fs = require('fs');
const read = fs.readFileSync("day08.txt");
let data = read.toString().split('\n').map(el=>el.split(' '))
let i = acc = 0
let finished = check = false
let loop = oldLoop = ""
let p = []
let pOne

while(!finished){
    let [inst,n] = data[i]
    n=parseInt(n)
    switch(inst){
        case 'acc':
            acc+=n
            i++
            break
        case 'jmp':
            i+=n
            check ? (loop+="-"+i, loop.length==oldLoop.length ? (console.log("Part one = " +pOne), finished = true) : undefined) 
                  : p.indexOf(i)>-1 ? (oldLoop = p.slice(p.indexOf(i)).join('-'), check = true, loop+=i, pOne = acc) : undefined
            !check ? p.push(i) : undefined
            break
        case 'nop':
            i++
            break
    }
}

let ind = [...data.map((el,i)=>{
    return el[0]=="jmp" ? i : undefined
}).filter(el=>el!=undefined), ...data.map((el,i)=>{
    return el[0]=="nop" ? i : undefined
}).filter(el=>el!=undefined)]

let partTwo = false

for(let u=0;u<ind.length;u++){
    let i = acc = c = 0
    let finished = false
    while(!finished && !partTwo){
        let [inst,n] = data[i]
        n=parseInt(n)
        c++
        if(i==ind[u]){
            inst = inst=="jmp" ? "nop" : "jmp"
        }
        inst=='acc' ? (acc+=n,i++) : inst=="jmp" ? i+=n : i++
        c>1000?finished=true:undefined
        if(i>=data.length){
            partTwo = true
            u = ind.length
            console.log("Part two = "+acc)
        }
    }
}

