const fs = require('fs');
const read = fs.readFileSync("day20.txt");
let tiles = new Map()
read.toString().split('\r\n').forEach((el,ind,arr)=>{
    let m = el.match(/\d+/)
    if(m){
        let t = arr.splice(ind+1,10).map(el=>el.split('')) /// 10
        tiles.set(parseInt(m[0]),t)
    }
})


function turn90(matrix,res=[],c=0) {
    const result = matrix.map((row, i) => 
         row.map((val, j) => matrix[(matrix.length - 1) - j][i])
    );
    let flips = c==0 ? flip(result) : undefined
    res.push(result)
    c==0?(res.push(flips[0]),res.push(flips[1])):undefined
    c++
    return res.length==5 ? res : turn90(result,res,c);
}
function flip(arr){
    let lastInd = arr.length-1;
    let flipV = JSON.parse(JSON.stringify(arr)).map(el=>el.reverse());
    let flipH = []
    for(let i=lastInd;i>=0;i--){
        flipH.push(arr[i])
    }
    return [flipV,flipH]

}
for(let[k,v] of tiles){
    let poss = [v,...flip(v),...turn90(v)]
    tiles.set(k,poss)
}

let orga = new Map()
let possibleCenter = []
for(let [k,v] of tiles){
    v.forEach((poss,i)=>{
        let [top,bottom,left,right] = getBorder(poss)
        let c = 0
        for(let [kk,vv] of tiles){
            vv.forEach((posss,ii)=>{
                if(k!==kk){
                    let [topp,bottomm,leftt,rightt] = getBorder(posss)
                    let m
                    /// ID-one = [ID Two, indexOne, indexTwo, posOne, posTwo]
                    if(top==bottomm){
                        c++
                        m = [kk,i,ii,'top','bottom']
                        orga.has(k) ? orga.get(k).push(m) : orga.set(k,[m])
                    }
                    if(bottom==topp){
                        c++
                        m = [kk,i,ii,'bottom','top']
                        orga.has(k) ? orga.get(k).push(m) : orga.set(k,[m])
                    }
                    if(left==rightt){
                        c++
                        m = [kk,i,ii,'left','right']
                        orga.has(k) ? orga.get(k).push(m) : orga.set(k,[m])
                    }
                    if(right==leftt){
                        c++
                        m = [kk,i,ii,'right','left']
                        orga.has(k) ? orga.get(k).push(m) : orga.set(k,[m])

                    }
                }
              
            })
        }
        c==4 ? possibleCenter.indexOf(k)==-1 ? possibleCenter.push(k) : undefined : undefined     
    })
}

function getBorder(arr){
    let top = arr[0].join('')
    let bottom = arr[arr.length-1].join('')
    let left = arr.map(el=>el[0]).join('')
    let right = arr.map(el=>el[el.length-1]).join('')
    return [top,bottom,left,right]
}

let found = false
for(let [k,v] of orga){
    if(!found){
        if(possibleCenter.indexOf(k)==-1){
            let poss = v.filter(el=>possibleCenter.indexOf(el[0])==-1 && el[3]=='right' )
            for(let i=0;i<poss.length;i++){
                let el = poss[i]
                let t = ifPossible(el,2,[k],[false,false],k,el[1])
                if(t){
                    console.log('Part one = ' + t[0]*t[11]*t[22]*t[33])
                    found = true
                    break
                }
            }
        }        
    }

}

function ifPossible(poss,c,visited=[],last,lastId,lastIndex){
    let [neiId,indCurr,indNei,posCurr,posNei] = poss
    visited.push(neiId)
    if(visited.length==44){
        last[0]=true
    }
    let dir = c < 12 ? 'right' : c < 23 ? 'bottom' : c < 34 ? 'left' : 'top'
    let p = last[0]==false ? orga.get(neiId).filter(el=>possibleCenter.indexOf(el[0])==-1 && visited.indexOf(el[0]) == -1 && el[1]==indNei && el[3]==dir) :
    orga.get(neiId).filter(el=>el[0]==lastId && el[2]==lastIndex && el[1]==indNei)
    c++
    last[0] ? p.length>0 ? last[1]=true : undefined : p.forEach(el=>{
        ifPossible(el,c,visited,last,lastId,lastIndex)
     })
    return visited.length==44 && last[1]? visited : false 


}