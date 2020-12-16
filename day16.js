const fs = require('fs');
const read = fs.readFileSync("day16.txt");
let data = read.toString().split('\n')
let count = new Map()
let myTicket = data.slice(data.indexOf('')+2,data.indexOf('',data.indexOf('')+1)).join('').split(',').map(Number)
let rules = data.slice(0,data.indexOf('')).map(el=>el.split(':')).map(el=>{
    let l = el[1].split(' ').filter(el=>!isNaN(el[0])).map(el=>el.split('-').map(Number))
    let b = new Map()
    count.set(el[0],b)
    return [el[0],l[0],l[1]] 
})
let rulesPone = rules.map(el=>{return [el[1],el[2]]}).flat()
let tickets = data.slice(data.indexOf('')+5).map(el=>el.split(',').map(Number))

let pOne = 0
let invalid = []
for(let i=0;i<tickets.length;i++){ // For each billet
    for(let k=0;k<tickets[i].length;k++){ // for each number on ticket
        let valid = false
        for(let j=0;j<rulesPone.length;j++){ // For each rule
            if(tickets[i][k]>=rulesPone[j][0] && tickets[i][k]<=rulesPone[j][1]){
                valid = true
                break
            }
        }
        valid==false?(invalid.push(i),pOne+=tickets[i][k]) : undefined  
    }
}
console.log("Part one = " +pOne)

tickets =  tickets.filter((el,i)=>invalid.indexOf(i)==-1)
tickets.push(myTicket)
for(let i=0;i<rules.length;i++){ // For each rule
    let r = rules[i][1]
    let r2 = rules[i][2]
    for(let j=0;j<tickets.length;j++){ // For each ticket
        for(let k=0;k<tickets[j].length;k++){ // For each ticket number
            if((tickets[j][k]>=r[0] && tickets[j][k]<=r[1]) || (tickets[j][k]>=r2[0] && tickets[j][k]<=r2[1])){
                let a = count.get(rules[i][0])
                a.has(k) ? a.set(k,a.get(k)+1): a.set(k,1)
                count.set(rules[i][0],a)
            }
        }
    }

}

let start 
let k
count.forEach((val,key,map)=>{
    let max = Math.max(...val.values())
    let occ = [...val.entries()].filter((e) => e[1]==max).map(el=>el[0])
    occ.length==1 ? (start=occ[0],k=key) :undefined
    map.set(key,occ)
})

let done = []
let partTwo = recursive(count,start,k)
function recursive(map,pos,k){
        map.forEach((val,key,map)=>{
            if(key!==k){
                let v = val.filter(el=>el!==pos)
                map.set(key,v)
            }
        })   
    done.push(k)
    let single = [...map.entries()].filter(el=>el[1].length==1 && done.indexOf(el[0])==-1)
    if(single==0){
        let [a,b,c,d,e,f] = [map.get('departure location')[0],map.get('departure station')[0],map.get('departure platform')[0],
                            map.get('departure track')[0],map.get('departure date')[0],map.get('departure time')[0]]
        let r = tickets[tickets.length-1]
        return  r[a]*r[b]*r[c]*r[d]*r[e]*r[f]
    }else{
        for(let j=0;j<single.length;j++){
            return recursive(map,single[j][1][0],single[j][0])
        }
    }

}
console.log("Part two = " +partTwo)



















