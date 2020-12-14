const fs = require('fs');
const read = fs.readFileSync("day14.txt");
let data = read.toString().split('\n').map(el=>{
    el = el.split('=') 
    if(el[1].length > 30){
        return el[1].trim()
    }else{
        let m  = el[0].substring(3).trim().split('')
        m.pop()
        m.shift()
        return [parseInt(m.join('')),parseInt(el[1])]
    }
})

let mem = {}
let mem2 = {}
let mask

for(let i=0;i<data.length;i++){
    if(data[i].length==36){
        mask = data[i]
    }else{
        let val = data[i][1].toString(2)
        let add = data[i][0].toString(2)
        val = "000000000000000000000000000000000000".substr(val.length) + val;
        add = "000000000000000000000000000000000000".substr(add.length) + add;
        let res = ""
        let ad = ""
        for(let j=0;j<36;j++){
            mask[j]=="X" ? (res+=val[j],ad+='X') : mask[j]=="0" ? (ad+=add[j],res+=mask[j]) : (ad+=mask[j],res+=mask[j]) 
        }
        getAdresses(ad,[],Math.pow(2,ad.split('').filter(el=>el=="X").length)).map(el=>parseInt(el,2)).forEach(el=>{
            mem2[el] = data[i][1]
        })
        mem[data[i][0]] = parseInt(res, 2)
    }
}

function getAdresses(str, arr, l){
    if(str.split('').indexOf('X')==-1){
        arr.indexOf(str)==-1 ? arr.push(str) :undefined
    }else{
        for(let i=0;i<str.length;i++){
            if(str[i]=="X"){
                let a = str
                let b = str
                if(a.split('').indexOf("X")!==i){

                }else{                
                    a = a.substring(0, i) + '1' + a.substring(i + 1)
                    b = b.substring(0, i) + '0' + b.substring(i + 1)
                    getAdresses(a,arr,l)
                    getAdresses(b,arr,l) 
                }

            }
        }
    }
    if(arr.length==l){
        return arr
    }
}

let pOne = pTwo = 0
for (const [k, value] of Object.entries(mem)) { pOne+=value }
for (const [k, value] of Object.entries(mem2)) { pTwo+=value }

console.log("Part one = " + pOne)
console.log("Part two = " + pTwo)