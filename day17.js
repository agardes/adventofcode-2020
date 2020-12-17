const fs = require('fs');
const read = fs.readFileSync("day17.txt");
let data = read.toString().split('\r\n')
let actives = []
console.log(data)

let minZ = minY = minX = minW = -1
let maxZ = maxW = 1
let maxX = data[0].length
let maxY = data.length
data.forEach((line,y)=>{
    line = line.split('')
    line.forEach((cube,x)=>{
        if(cube=='#'){
            actives.push(x+'|'+y+'|'+0)
        }
    })
})

console.log(actives)
let oldActives= [...actives]
let cycle = 0
while(cycle<6){
    cycle++
    let newActives = []
    for(let y=minY;y<=maxY;y++){
        for(let x=minX;x<=maxX;x++){
            for(let z=minZ;z<=maxZ;z++){
                    let coord = x+'|'+y+'|'+z
                    let nei = getNei(x,y,z)
                    // if it's active
                    if(oldActives.indexOf(coord)!==-1){
                        let intersection = oldActives.filter(x => nei.includes(x));
                        if(intersection.length==3 || intersection.length==2 ){
                            newActives.push(coord)
                        }
                    }else{
                        let intersection = oldActives.filter(x => nei.includes(x));
                        if(intersection.length==3){
                            newActives.push(coord)
                        }
                    }
            }
        
        } 
    }
    oldActives = newActives
    minZ -= 1
    minY -= 1
    minX -= 1
    maxZ += 1
    maxX += 1
    maxY += 1
    if(cycle==6){
        console.log('Part one ' + newActives.length)
    }
    // console.log('////// Cycle ' + cycle)
    // console.log(newActives)
}

function getNei(x,y,z){
    let arr = []
    for(let xX=-1;xX<=1;xX++){
        for(let yY=-1;yY<=1;yY++){
            for(let zZ=-1;zZ<=1;zZ++){
                if(x+xX==x && y+yY==y && z+zZ==z){

                }else{
                    arr.push((x+xX)+'|'+(y+yY)+'|'+(z+zZ)) 
                }
                    
            }
        }
    }
    return arr
}

