const fs = require('fs');
const read = fs.readFileSync("day20.txt");
let tiles = new Map()
read.toString().split('\r\n').forEach((el,ind,arr)=>{
    let m = el.match(/\d+/)
    if(m){
        let t = arr.splice(ind+1,10).map(el=>el.split(''))
        tiles.set(parseInt(m[0]),t)
    }
})

for(let[k,v] of tiles){ // Create all rotation and flip possible for each tile
    let poss = [v,...flip(v),...turn90(v)]
    tiles.set(k,poss)
}

function getOrders(){ // Create a map that tells which tiles that can be connected
    let orga = new Map()
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
            })            
    }
    return orga
}

let allOrga = getOrders()
let finalOrder = []
let finalIndexes = []
let found = false

for(let [id,poss] of allOrga){
  if(!found){
    poss.filter(el=>el[0]!==id && el[3]=='right').forEach(next=>{
        !found ? findOrder(next,[id],[next[1]])    : undefined
    })
  }   
}

function findOrder(el,visited,visitedIndex){ // Recursive function that create the final order
    let [id,parentInd,index,parentDir,childDir] = el
    visited = [...visited,id]
    visitedIndex = [...visitedIndex,index]
    if(visited.length == 144){
        finalOrder = visited
        finalIndexes = visitedIndex
        found=true
        return false
    }
    let dir = 'right'
    let poss
    if(visited.length>11){
        if(visited.length%12==0){
            let onTopId= visited[visited.length-12]
            let onTopIndex = visitedIndex[visitedIndex.length-12]
            poss = allOrga.get(onTopId).filter(el=>visited.indexOf(el[0])==-1 && el[1]==onTopIndex && el[3]=="bottom")
            if(poss.length==0){
                return false
            }
            el = poss[0];
            [id,parentInd,index,parentDir,childDir] = el
            visited.push(el[0])
            visitedIndex.push(el[2])
        }
        poss = allOrga.get(id).filter(el=>el[0]!==id && el[3]==dir && visited.indexOf(el[0])==-1 && el[1]==index)
        let nextId = visited[visited.length-12]
        let nextInd = visitedIndex[visitedIndex.length-12]
        let m = allOrga.get(poss[0][0]).find(el=>el[0]==nextId && el[2]==nextInd && el[3]=='top')
        if(!m){
            return false
        }
    }else{
         poss = allOrga.get(id).filter(el=>el[0]!==id && el[3]==dir && visited.indexOf(el[0])==-1 && el[1]==index)
    }
    if(poss.length==0){
        return false
    }
    poss.forEach(next=>{
        findOrder(next,visited,visitedIndex)
    })
}

console.log("Part one = " + finalOrder[0]*finalOrder[11]*finalOrder[132]*finalOrder[143])

finalOrder.forEach((nb,i)=>{    // Reset all tiles with correct orientation and get rid of borders
    let m = tiles.get(nb)[finalIndexes[i]]
    tiles.set(nb,getRidOfBorders(m))
})

let seaMap = []
let j = 0
let b = 0
for(let y=0;y<96;y++){ // Create the final sea map
    if(y!==0 && y%8==0){
        j+=8
        b+=12
    }
    let row = []
    let i = b
    for(let x=0;x<96;x++){
        row = [...row,...tiles.get(finalOrder[i])[y-j]]
        x+=7
        i++
    }
    seaMap.push(row)
}

let possFinal = [seaMap,...flip(seaMap),...turn90(seaMap)] // Create all possible orientation for sea map
let monsters = 0
let totalHash = seaMap.map(el=>el.filter(l=>l=='#').length).reduce((a,b)=>a+b)

possFinal.forEach((poss,i)=>{
    seaMonster(poss,i)
})

console.log('Part two = ' + parseInt(totalHash-monsters*15))

function turn90(matrix,res=[],c=0) {
    const result = matrix.map((row, i) => row.map((val, j) => matrix[(matrix.length - 1) - j][i]));
    let flips = c==0 ? flip(result) : undefined
    res.push(result)
    c==0?(res.push(flips[0]),res.push(flips[1])):undefined
    c++
    return res.length==5 ? res : turn90(result,res,c);
}
function flip(arr){
    let flipV = JSON.parse(JSON.stringify(arr)).map(el=>el.reverse());
    let flipH = []
    for(let i=arr.length-1;i>=0;i--){
        flipH.push(arr[i])
    }
    return [flipV,flipH]

}
function getBorder(arr){
    return [arr[0].join(''), arr[arr.length-1].join(''),arr.map(el=>el[0]).join(''),arr.map(el=>el[el.length-1]).join('')]
}

function getRidOfBorders(tile){
    tile.shift()
    tile.pop()
    tile = tile.map(el=>{
        el.shift()
        el.pop()
        return el
    })
    return tile
}

function seaMonster(map){
    map.forEach((row,y)=>{
        row.forEach((el,x)=>{
            if(el=='#'){
                if(map[y][x+5]=='#' && map[y][x+6]=='#' && map[y][x+11]=='#' && map[y][x+12]=='#' &&
                map[y][x+17]=='#' && map[y][x+18]=='#' && map[y][x+19]=='#' && map[y-1][x+18]=="#" &&
                map[y+1][x+1]=="#" && map[y+1][x+4]=="#" && map[y+1][x+7]=="#" && map[y+1][x+10]=="#" &&
                map[y+1][x+13]=="#" && map[y+1][x+16]=="#"){
                    monsters++
                }
            }
        })
    })
}
