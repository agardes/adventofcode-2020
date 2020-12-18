const fs = require('fs');
const read = fs.readFileSync("day18.txt");
let data = read.toString().split('\r\n').map(el=>el.replace(/ /g,'').split('').map(el=>{
    return isNaN(el) ? el : parseInt(el)
}))
let res = 0
const day18 = {
    run(part){
        data.forEach(el=>{
            let par = parIndex(el)
            let k = [...el]
            let m = [...k]
            while(m.indexOf('(')!==-1){
                let last = 0
                for (let [key, value] of Object.entries(par)) {
                    key = parseInt(key)
                    let p = k.slice(key+1,value)
                    if(p.indexOf('(')==-1){
                         m.splice(key-last,p.length+2,parse(p,part))
                         last += p.length+1
                    }
                  }
                  par = parIndex(m)
                  k = [...m]
            }
            res+=parse(k,part)
        })
        return res
    }
}


function parIndex(el){
    let par = {}
    let last 
    let first 
    for(let i=0;i<el.length;i++){
        if(el[i]=='('){
            par[i] = undefined
            first==undefined ? first= i : undefined
            last=i
        }else if(el[i]==')'){
            last==undefined ? par[first] = i: par[last] = i
            last = undefined
        }
    }
    return par
}

function parse(el,part){
    let prev
    let c = 0
    if(part=='two'){
        let r = el.join('').split('*')
        if(r.length!==1){
            return r.map(el=>el.split('+').map(Number).reduce((a,b)=>a+b)).reduce((a,b)=>a*b)
        }
    }
    for(let i=0;i<el.length;i++){
        !isNaN(el[i]) ? prev = el[i] : el[i]=="+" ? prev ? c += el[i+1]+prev : c+=el[i+1] : prev ? c==0 ? c = el[i+1]*prev : c*=el[i+1]*prev : c*=el[i+1]
        isNaN(el[i]) ? (i++,prev=undefined) : undefined
    }
    return c
}

console.log('Part one = ' + day18.run('one'))
res = 0
console.log('Part two = ' + day18.run('two'))