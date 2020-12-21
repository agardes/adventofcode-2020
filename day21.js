const fs = require('fs');
const read = fs.readFileSync("day21.txt");
let ingMap = new Map()
let totalWords = new Map()
let data = read.toString().split('\r\n').map(el=>el.split('(contains ')).map(el=>{
    let w = el[0].split(' ').filter(String)
    let ing = el[1].slice(0,-1).split(', ')
    ing.forEach(el=>{
        let v = ingMap.get(el) || []
        v.push(w)
        ingMap.set(el,v)
    })
    w.forEach(el=>{
        totalWords.set(el,'')
    })
    return [w,ing]
})
let first = true
let allFound = false
while(!allFound){
    allFound=true
    for(let [ing,lists] of ingMap){
        if(typeof lists !== 'string'){
            let m = first ? lists.reduce((a, b) => a.filter(c => b.includes(c))) : lists
            m = m.filter(el=>{
                if(totalWords.get(el)!==''){
                    return false
                }else{
                    return true
                }
            })
            m.length==1 ? (ingMap.set(ing,m[0]), totalWords.set(m[0],ing)) : m.length!==0 ? (allFound = false,ingMap.set(ing,m)) : undefined   
        }
      
    } 
    first = false
}

let allergens = []
let allergensW = []
for(let [k,v] of ingMap){
    allergens.push(v)
    allergensW.push(k)
}

let pOne = 0
let pTwo = ''
data.forEach(line=>{ 
    pOne+=line[0].filter(x => !allergens.includes(x)).length 
})

allergensW.sort()
allergensW.forEach(el=>{ pTwo+=ingMap.get(el)+','})
console.log('Part one = ' + pOne)
console.log('Part two = ' + pTwo.slice(0,-1))
